const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Auth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add useAuth import
content = content.replace(
  "import { Button } from '@/components/ui/button';",
  "import { useAuth } from '@/contexts/AuthContext';\nimport { Button } from '@/components/ui/button';"
);

// Add useAuth hook
content = content.replace(
  "const navigate = useNavigate();",
  "const navigate = useNavigate();\n  const { login, register } = useAuth();"
);

// Update signupData
content = content.replace(
  "name: '',",
  "firstName: '',\n    lastName: '',"
);

// Update handleLogin
const oldLogin = /const handleLogin = async \(e: React\.FormEvent\) => \{[^}]+setIsLoading\(true\);[^}]+\/\/ Simulate API call[^}]+setTimeout\(\(\) => \{[^}]+\}, 1000\);[^}]+\};/s;
const newLogin = `const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login({
        email: loginData.email,
        password: loginData.password,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };`;
content = content.replace(oldLogin, newLogin);

// Update handleSignup
const oldSignup = /\/\/ Simulate API call[^}]+setTimeout\(\(\) => \{[^}]+toast\.success\('Account created successfully!'\);[^}]+navigate\('\/dashboard'\);[^}]+\}, 1000\);/s;
const newSignup = `try {
      await register({
        firstName: signupData.firstName || signupData.email.split('@')[0],
        lastName: signupData.lastName || '',
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }`;
content = content.replace(oldSignup, newSignup);

fs.writeFileSync(filePath, content);
console.log('✅ Auth.tsx updated successfully!');
