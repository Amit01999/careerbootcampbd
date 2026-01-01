// MongoDB initialization script for Docker
// This runs when MongoDB container starts for the first time

db = db.getSiblingDB('bootcamp');

// Create collections
db.createCollection('users');
db.createCollection('questions');
db.createCollection('questionfiles');
db.createCollection('exams');
db.createCollection('examattempts');
db.createCollection('payments');
db.createCollection('circulars');
db.createCollection('notifications');
db.createCollection('settings');
db.createCollection('auditlogs');

print('✅ Database and collections created successfully');
