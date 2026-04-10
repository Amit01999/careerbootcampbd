import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Loader2,
  ReceiptText ,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bankRecruitmentService, BankRecruitmentItem } from '@/services/bankRecruitment.service';

export default function RecruitmentProcessDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [item, setItem] = React.useState<BankRecruitmentItem | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        const id = params.id as string;
        const res = await bankRecruitmentService.getById(id);
        setItem(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load recruitment');
      } finally {
        setLoading(false);
      }
    };
    if (params.id) run();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] mt-20 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#09090B] mt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-3 flex justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">
            Recruitment Not Found
          </h1>
          <p className="text-gray-400 font-medium mb-6">
            {error || "We couldn't find the recruitment you're looking for."}
          </p>
          <Button
            onClick={() => navigate('/recruitment-processes')}
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
          >
            Back to Recruitments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] mt-20">
      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,140,255,0.12)_0%,_transparent_55%)]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[760px] bg-blue-500/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-indigo-500/5 rounded-full blur-[120px]" />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(99,140,255,0.35), transparent)',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Back button */}
          <button
            onClick={() => navigate('/recruitment-processes')}
            className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-all duration-300 group text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-transparent group-hover:border-gray-500 pb-0.5">
              Back to All Recruitments
            </span>
          </button>

          {/* Hero card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Logo */}
                <div className="shrink-0 self-center sm:self-auto">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-xl border border-white/10 bg-white/[0.04] overflow-hidden">
                    <img
                      src={item.bankLogoUrl}
                      alt={`${item.bankName} logo`}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-[0.18em] mb-3 border-blue-500/25 bg-blue-500/10 text-blue-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    Bank Recruitment
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight truncate">
                    {item.bankName}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-gray-200">
                      {item.positionTitle}
                    </span>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent" />
      </div>

      {/* ─── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8  pb-24">
        <div className="max-w-4xl mx-auto">
          <div id="recruitment-details" className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-blue-500/20 bg-blue-500/10">
              <ReceiptText  className="w-5 h-5 text-blue-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Recruitment Details
            </h2>
          </div>

          <div
            className="rounded-2xl p-6 lg:p-8 border backdrop-blur-sm"
            style={{
              background:
                'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="text-gray-300 leading-[1.85] text-[15px] whitespace-pre-wrap">
              {item.details}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
