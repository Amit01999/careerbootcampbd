import React from 'react';
import { Badge, CheckCircle, Download } from 'lucide-react';
import { Button } from '../ui/button';
import appScreen from '../../assets/mobile.png';

export default function AppPromotion() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <Badge className="bg-[#25cd71] text-white hover:bg-[#25cd71] w-fit">
              Available Now
            </Badge>

            <h2 className="text-4xl font-bold tracking-tight text-[#2e3a42] leading-tight">
              Prepare Anytime, Anywhere
            </h2>

            <p className="text-lg text-[#5f6b75] max-w-xl">
              Download the Private Bank Bootcamp mobile app to access full
              courses, mock tests, and live classes anytime. Learn flexibly and
              stay exam-ready wherever you are.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 pt-2">
              {[
                'Offline video downloads',
                'Live class notifications',
                'Daily practice reminders',
                'Light & dark mode support',
                'Cross-device sync',
                'Low data usage mode',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#25cd71] mt-0.5" />
                  <span className="text-[#5f6b75]">{feature}</span>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="flex gap-10 pt-4">
              <div>
                <div className="text-2xl font-bold text-[#2e3a42]">50,000+</div>
                <div className="text-sm text-[#8aa0ae]">Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2e3a42]">4.8 ★</div>
                <div className="text-sm text-[#8aa0ae]">Play Store</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2e3a42]">4.7 ★</div>
                <div className="text-sm text-[#8aa0ae]">App Store</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="bg-black text-white hover:bg-neutral-800 px-6">
                <Download className="mr-2 h-5 w-5" />
                Google Play
              </Button>
              <Button className="bg-black text-white hover:bg-neutral-800 px-6">
                <Download className="mr-2 h-5 w-5" />
                App Store
              </Button>
            </div>
          </div>

          {/* RIGHT – PHONE MOCKUP */}
          <div className="relative hidden lg:flex justify-center">
            {/* Glow */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-[#25cd71]/30 to-[#0ad0f4]/30 blur-3xl rounded-full" />

            {/* Phone Body */}
            <div className="relative w-[280px] h-[560px] bg-black rounded-[42px] p-[10px] shadow-2xl">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-20" />

              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                <img
                  src={appScreen}
                  alt="Private Bank Bootcamp App"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
