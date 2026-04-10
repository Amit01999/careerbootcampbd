import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageSquare, Loader2, ChevronRight, AlertCircle } from 'lucide-react';
import { vivaPreparationService, VivaPreparationItem } from '@/services/vivaPreparation.service';
import { toast } from 'sonner';

const BG      = '#111110';
const SURFACE = '#1C1B18';
const CARD    = '#1E1D1B';
const BORDER  = 'rgba(255,255,255,0.07)';
const GOLD    = '#C49B4B';
const TEXT    = '#F0EBE1';
const MUTED   = '#8A8278';

const VivaPreparation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<VivaPreparationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await vivaPreparationService.getAll();
        setItems(response.data);
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to load content';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: BG }} className="min-h-screen mt-20">
      {/* Header */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div
              style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}22` }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
            >
              <MessageSquare style={{ color: GOLD }} className="w-5 h-5" />
            </div>
            <h1 style={{ color: TEXT }} className="text-xl font-bold tracking-tight">
              Viva Preparation
            </h1>
          </div>
          <p style={{ color: MUTED }} className="text-sm mt-2 ml-[52px]">
            Browse viva question guides and preparation materials.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Search */}
        <div className="py-5">
          <div className="relative">
            <Search
              style={{ color: MUTED }}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search by headline…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                color: TEXT,
                outline: 'none',
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-[#6A6460] focus:border-[#C49B4B]/40 transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="pb-16">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <AlertCircle className="w-7 h-7 text-red-400" />
              <p style={{ color: MUTED }} className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}
                className="px-4 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity"
              >
                Retry
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <p style={{ color: MUTED }} className="text-center py-24 text-sm">
              {searchQuery
                ? 'No results matched your search.'
                : 'No content available yet. Check back soon.'}
            </p>
          ) : (
            <>
              <p style={{ color: MUTED }} className="text-xs mb-3">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-1.5">
                {filteredItems.map((item, i) => (
                  <button
                    key={item._id}
                    onClick={() => navigate(`/viva-preparation/${item._id}`)}
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl text-left group hover:border-[#C49B4B]/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span style={{ color: MUTED, minWidth: 24 }} className="text-xs font-mono text-right">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div
                        style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}1A` }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      >
                        <MessageSquare style={{ color: GOLD }} className="w-3.5 h-3.5" />
                      </div>
                      <span style={{ color: TEXT }} className="text-sm font-medium truncate leading-snug">
                        {item.headline}
                      </span>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: MUTED }}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VivaPreparation;
