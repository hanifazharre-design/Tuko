import { useEffect, useState, useRef } from "react";
import { Ticket, CalendarDays, MapPin, Search, AlertCircle, CheckCircle2, CreditCard, Wallet, QrCode, Printer, X, Receipt } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/events`;

type EventData = {
  id: number;
  name: string;
  category_id: number;
  location: string;
  date: string;
  description: string;
  image?: string;
  price?: number; 
};

export default function TiketIndex() {
  const user = useAuthStore((state) => state.user);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Payment Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [paymentStep, setPaymentStep] = useState<"SELECT" | "PROCESSING" | "SUCCESS">("SELECT");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [generatedOrderId, setGeneratedOrderId] = useState<string>("");

  // Reference for the ticket to print
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Gagal mengambil data event");
      const data = await res.json();
      
      const eventsWithPrice = data.map((ev: any) => ({
        ...ev,
        date: ev.date || ev.dateEvent, // Map backend's dateEvent to date
        price: ev.price || (Math.floor(Math.random() * 5) * 50000)
      }));
      setEvents(eventsWithPrice);
    } catch (err: any) {
      console.error(err);
      setEvents([
        { id: 1, name: "Invofest Hackathon 2026", category_id: 1, location: "Gedung Utama Politeknik", date: "2026-08-15", description: "Kompetisi hacking bergengsi tingkat nasional", price: 150000 },
        { id: 2, name: "Seminar AI & Future Tech", category_id: 2, location: "Auditorium Lantai 3", date: "2026-09-10", description: "Membahas masa depan AI dan implementasinya", price: 50000 },
        { id: 3, name: "Workshop React JS", category_id: 3, location: "Lab Komputer 1", date: "2026-09-12", description: "Belajar react dari nol sampai mahir dalam 1 hari", price: 0 },
        { id: 4, name: "Cybersecurity Bootcamp", category_id: 4, location: "Lab Keamanan Siber", date: "2026-10-01", description: "Bootcamp intensif 3 hari tentang keamanan siber", price: 200000 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = (event: EventData) => {
    setSelectedEvent(event);
    setPaymentStep("SELECT");
    setSelectedMethod(null);
    setIsModalOpen(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedMethod && selectedEvent?.price !== 0) return;
    
    setPaymentStep("PROCESSING");
    
    try {
      const payload = {
        userId: user?.id || 1, // Fallback ke 1 jika user blm login (tapi harusnya sudah)
        eventId: selectedEvent?.id,
        paymentMethod: selectedEvent?.price === 0 ? "free" : selectedMethod,
      };

      const res = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Gagal memproses pembayaran");
      
      const data = await res.json();
      setGeneratedOrderId(data.orderId);

      // Simulate a bit of loading for UX
      setTimeout(() => {
        setPaymentStep("SUCCESS");
      }, 1500);

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memproses pembayaran. Pastikan database backend sudah berjalan.");
      setPaymentStep("SELECT");
    }
  };

  const handlePrintTicket = () => {
    if (!selectedEvent) return;
    
    // Gunakan order ID dari backend
    const orderId = generatedOrderId || `#INV-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date(selectedEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    
    // Get QR Code SVG outerHTML if available, otherwise just text
    const svgElement = ticketRef.current?.querySelector('svg');
    const qrCodeHtml = svgElement ? svgElement.outerHTML : '<div style="width: 120px; height: 120px; background: #000;"></div>';

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Cetak Tiket - ${selectedEvent.name}</title>
            <style>
              @page { size: landscape; margin: 0; }
              body { 
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                margin: 0; 
                padding: 0; 
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .ticket {
                width: 850px;
                height: 320px;
                border: 2px solid #1a365d;
                border-radius: 12px;
                display: flex;
                overflow: hidden;
                position: relative;
                background: #fff;
                box-sizing: border-box;
              }
              .left {
                width: 72%;
                padding: 24px 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
              }
              .right {
                width: 28%;
                border-left: 3px dashed #1a365d;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
                background: #f8fafc;
              }
              .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: 4px solid #f26522; /* KAI Orange */
                padding-bottom: 12px;
                margin-bottom: 15px;
              }
              .title {
                color: #f26522;
                font-size: 26px;
                font-weight: 900;
                margin: 0;
                text-transform: uppercase;
                letter-spacing: 2px;
                line-height: 1;
              }
              .logo {
                font-size: 24px;
                font-weight: 900;
                color: #1a365d; /* KAI Blue */
                margin: 0;
                line-height: 1;
              }
              .event-name {
                font-size: 28px;
                font-weight: 900;
                color: #0f172a;
                margin: 0 0 20px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .info-grid {
                display: grid;
                grid-template-columns: 1.5fr 1fr;
                gap: 15px 20px;
              }
              .info-group {
                display: flex;
                flex-direction: column;
              }
              .info-label {
                font-size: 10px;
                color: #64748b;
                text-transform: uppercase;
                font-weight: 800;
                margin: 0 0 4px 0;
                letter-spacing: 0.5px;
              }
              .info-value {
                font-size: 16px;
                font-weight: 800;
                color: #0f172a;
                margin: 0;
              }
              .qr-container {
                padding: 10px;
                background: #fff;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                margin-bottom: 15px;
              }
              .qr-container svg {
                width: 120px !important;
                height: 120px !important;
              }
              .order-id {
                font-size: 18px;
                font-weight: 900;
                color: #1a365d;
                letter-spacing: 1px;
                margin-bottom: 5px;
              }
              .footer-note {
                font-size: 10px;
                text-align: center;
                color: #64748b;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="left">
                <div class="header">
                  <h1 class="logo">INVOFEST <span style="color:#f26522;font-size:16px;">TICKETING</span></h1>
                  <h2 class="title">BOARDING PASS</h2>
                </div>
                <h3 class="event-name">${selectedEvent.name}</h3>
                <div class="info-grid">
                  <div class="info-group">
                    <p class="info-label">Nama Penumpang / Passenger Name</p>
                    <p class="info-value">${user || "User Invofest"}</p>
                  </div>
                  <div class="info-group">
                    <p class="info-label">Tanggal Keberangkatan / Date</p>
                    <p class="info-value" style="color: #1a365d;">${formattedDate}</p>
                  </div>
                  <div class="info-group">
                    <p class="info-label">Lokasi / Location</p>
                    <p class="info-value">${selectedEvent.location}</p>
                  </div>
                  <div class="info-group">
                    <p class="info-label">Status Pembayaran / Status</p>
                    <p class="info-value" style="color: #059669;">LUNAS (PAID)</p>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="qr-container">
                  ${qrCodeHtml}
                </div>
                <div class="order-id">${orderId}</div>
                <div class="footer-note">Tunjukkan E-Ticket ini saat Check-In</div>
              </div>
            </div>
            <script>
              // Trigger print immediately after load
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => { window.close(); }, 500);
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const closeModal = () => {
    if (paymentStep === "PROCESSING") return;
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
      setGeneratedOrderId("");
    }, 300); // Clear after animation
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
  };

  const filteredEvents = events.filter((ev) =>
    ev.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* HEADER SECTION - Hide during print */}
      <div className="print:hidden flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#6A112A] to-[#ff3366]" />
            <span className="text-xs font-bold text-[#6A112A] tracking-widest uppercase">
              Ticketing System
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pembelian Tiket</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Temukan dan daftar ke acara-acara terbaik di Invofest</p>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full md:w-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari nama event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72 pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#6A112A]/10 focus:border-[#6A112A] shadow-sm transition-all"
          />
        </div>
      </div>

      {/* CONTENT AREA - Hide during print */}
      <div className="print:hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#6A112A] rounded-full animate-spin mb-4" />
            <p className="font-medium animate-pulse">Memuat daftar event...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
            <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Event tidak ditemukan</h3>
            <p className="text-gray-500 text-sm">Coba ubah kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center">
                  {event.image ? (
                    <img src={`${API_URL}${event.image}`} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Ticket className="w-16 h-16 text-gray-300/50 group-hover:scale-110 group-hover:text-[#6A112A]/20 transition-all duration-500" />
                  )}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                    <span className={`text-xs font-black ${event.price === 0 ? 'text-emerald-600' : 'text-[#6A112A]'}`}>
                      {formatPrice(event.price!)}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-3 group-hover:text-[#6A112A] transition-colors">{event.name}</h3>
                  <p className="text-sm text-gray-500 mb-5 line-clamp-2">{event.description}</p>
                  
                  <div className="mt-auto space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <CalendarDays size={14} />
                      </div>
                      {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <MapPin size={14} />
                      </div>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyClick(event)}
                    className="w-full py-3.5 px-4 bg-[#6A112A] hover:bg-[#851635] text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:shadow-[0_6px_20px_rgba(106,17,42,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <Ticket size={18} />
                    Beli Tiket Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAYMENT & PRINT MODAL */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 print:absolute print:inset-0 print:bg-white print:p-0">
          
          {/* Modal Container */}
          <div className={`bg-white rounded-3xl w-full ${paymentStep === "PROCESSING" ? "max-w-md" : "max-w-4xl"} shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] print:shadow-none print:max-h-none print:max-w-none print:w-full transition-all duration-500`}>
            
            {/* Close Button - Hide during print */}
            {paymentStep !== "PROCESSING" && (
              <button 
                onClick={closeModal}
                className="print:hidden absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full text-gray-600 transition-colors z-20"
              >
                <X size={20} />
              </button>
            )}

            {/* STEP 1: SELECT PAYMENT */}
            {paymentStep === "SELECT" && (
              <>
                {/* Left Side: Order Summary */}
                <div className="md:w-5/12 bg-gray-50 p-8 border-r border-gray-100 flex flex-col print:hidden">
                  <h2 className="text-xl font-black text-gray-900 mb-6">Ringkasan Pesanan</h2>
                  
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
                    <div className="h-32 bg-gradient-to-br from-[#6A112A] to-[#851635] relative flex items-center justify-center">
                      {selectedEvent.image ? (
                        <img src={`${API_URL}${selectedEvent.image}`} alt={selectedEvent.name} className="w-full h-full object-cover opacity-80" />
                      ) : (
                        <Ticket size={48} className="text-white/20" />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{selectedEvent.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarDays size={16} className="text-[#6A112A]" />
                          {new Date(selectedEvent.date).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={16} className="text-[#6A112A]" />
                          <span className="truncate">{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                      <span className="font-bold text-gray-500">Total Pembayaran</span>
                      <span className={`text-2xl font-black ${selectedEvent.price === 0 ? 'text-emerald-600' : 'text-[#6A112A]'}`}>
                        {formatPrice(selectedEvent.price!)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Payment Methods */}
                <div className="md:w-7/12 p-8 overflow-y-auto print:hidden bg-white">
                  <div className="mb-8">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 text-[#6A112A]">
                      <Wallet size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Metode Pembayaran</h2>
                    <p className="text-gray-500 text-sm mt-1">Pilih metode pembayaran yang paling nyaman untuk Anda.</p>
                  </div>

                  {selectedEvent.price! > 0 ? (
                    <div className="space-y-4 mb-8">
                      {/* QRIS Option */}
                      <label className={`relative flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedMethod === 'qris' ? 'border-[#6A112A] bg-[#6A112A]/5 shadow-md scale-[1.02]' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" className="hidden" onChange={() => setSelectedMethod('qris')} />
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors ${selectedMethod === 'qris' ? 'bg-[#6A112A] text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <QrCode size={24} />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 text-base">QRIS (E-Wallet)</h5>
                          <p className="text-sm text-gray-500 mt-0.5">Gopay, OVO, Dana, LinkAja</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === 'qris' ? 'border-[#6A112A]' : 'border-gray-300'}`}>
                          {selectedMethod === 'qris' && <div className="w-3 h-3 bg-[#6A112A] rounded-full animate-in zoom-in duration-200" />}
                        </div>
                      </label>
                      
                      {/* Transfer Option */}
                      <label className={`relative flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedMethod === 'transfer' ? 'border-[#6A112A] bg-[#6A112A]/5 shadow-md scale-[1.02]' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="payment" className="hidden" onChange={() => setSelectedMethod('transfer')} />
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors ${selectedMethod === 'transfer' ? 'bg-[#6A112A] text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                          <CreditCard size={24} />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 text-base">Transfer Bank (VA)</h5>
                          <p className="text-sm text-gray-500 mt-0.5">BCA, Mandiri, BNI, BRI, BSI</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === 'transfer' ? 'border-[#6A112A]' : 'border-gray-300'}`}>
                          {selectedMethod === 'transfer' && <div className="w-3 h-3 bg-[#6A112A] rounded-full animate-in zoom-in duration-200" />}
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                      <CheckCircle2 className="text-emerald-500 mt-1" size={24} />
                      <div>
                        <h4 className="font-bold text-emerald-900 text-lg mb-1">Tiket Gratis!</h4>
                        <p className="text-emerald-700 text-sm">Event ini tidak dipungut biaya. Anda bisa langsung mengklaim tiket tanpa perlu melakukan pembayaran.</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <button
                      onClick={handleProcessPayment}
                      disabled={selectedEvent.price! > 0 && !selectedMethod}
                      className="w-full py-4 bg-[#6A112A] hover:bg-[#851635] text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:shadow-[0_6px_20px_rgba(106,17,42,0.23)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none text-lg flex items-center justify-center gap-2"
                    >
                      {selectedEvent.price === 0 ? (
                        <>Klaim Tiket Gratis <Ticket size={20} /></>
                      ) : (
                        <>Bayar Sekarang <span className="opacity-50 mx-2">|</span> {formatPrice(selectedEvent.price!)}</>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                      <AlertCircle size={12} /> Transaksi aman dan terenkripsi.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: PROCESSING */}
            {paymentStep === "PROCESSING" && (
              <div className="p-12 w-full flex flex-col items-center justify-center text-center print:hidden min-h-[400px]">
                <div className="relative mb-8">
                  <div className="w-24 h-24 border-8 border-gray-100 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 border-8 border-[#6A112A] rounded-full border-t-transparent animate-spin"></div>
                  <Receipt className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#6A112A]" size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Memproses Pembayaran...</h3>
                <p className="text-gray-500 font-medium">Mohon tunggu sebentar, jangan menutup halaman ini.</p>
              </div>
            )}

            {/* STEP 3: SUCCESS & PRINT TICKET */}
            {paymentStep === "SUCCESS" && (
              <div className="w-full flex flex-col h-full print:block print:w-full">
                
                {/* Success Header - Hide during print */}
                <div className="bg-[#10b981] p-6 text-center text-white print:hidden shrink-0">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 size={32} className="text-white" />
                    <h2 className="text-2xl font-black tracking-tight">Pembayaran Berhasil!</h2>
                  </div>
                  <p className="text-emerald-50 mt-1 font-medium text-sm">Tiket elektronik Anda sudah siap dicetak atau disimpan.</p>
                </div>

                {/* TICKET TO PRINT */}
                <div className="p-6 md:p-10 bg-gray-100 flex-1 print:p-0 print:bg-white flex items-center justify-center">
                  
                  {/* Horizontal Boarding Pass Ticket */}
                  <div 
                    ref={ticketRef}
                    className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl print:shadow-none print:border-2 print:border-gray-800 relative"
                  >
                    
                    {/* LEFT PART: Event Info */}
                    <div className="w-full md:w-2/3 p-8 relative">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6A112A] to-[#ff3366] print:bg-[#6A112A]"></div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <img src="https://www.invofest-harkatnegeri.com/assets/text-image.png" alt="Invofest" className="h-6 object-contain" />
                        <span className="px-3 py-1 bg-[#6A112A]/10 text-[#6A112A] text-[10px] font-black tracking-widest uppercase rounded-md">VVIP Pass</span>
                      </div>

                      <h3 className="text-3xl font-black text-gray-900 leading-none mb-6">{selectedEvent.name}</h3>

                      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-2">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Nama Peserta</p>
                          <p className="font-bold text-gray-900 text-lg">{user || "User Invofest"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Lokasi</p>
                          <p className="font-bold text-gray-900 text-sm leading-snug">{selectedEvent.location}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Tanggal & Waktu</p>
                          <p className="font-bold text-[#6A112A] text-sm">
                            {new Date(selectedEvent.date).toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Status</p>
                          <p className="font-black text-emerald-600 text-sm tracking-wide">LUNAS</p>
                        </div>
                      </div>
                    </div>

                    {/* DIVIDER (Dashed Line) */}
                    <div className="hidden md:flex flex-col items-center relative print:flex">
                      <div className="absolute top-0 w-8 h-4 bg-gray-100 rounded-b-full print:bg-white -translate-y-1/2"></div>
                      <div className="h-full border-l-2 border-dashed border-gray-300"></div>
                      <div className="absolute bottom-0 w-8 h-4 bg-gray-100 rounded-t-full print:bg-white translate-y-1/2"></div>
                    </div>
                    {/* Mobile Divider */}
                    <div className="md:hidden flex items-center relative">
                      <div className="absolute left-0 w-4 h-8 bg-gray-100 rounded-r-full -translate-x-1/2"></div>
                      <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                      <div className="absolute right-0 w-4 h-8 bg-gray-100 rounded-l-full translate-x-1/2"></div>
                    </div>

                    {/* RIGHT PART: QR Code */}
                    <div className="w-full md:w-1/3 bg-gray-50 flex flex-row md:flex-col items-center justify-center p-8 print:border-l-2 print:border-dashed print:border-gray-800">
                      <div className="text-center md:mb-6 flex-1 md:flex-none">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Order ID</p>
                        <p className="font-bold text-gray-900 text-lg">{generatedOrderId || `#INV-${Math.floor(1000 + Math.random() * 9000)}`}</p>
                      </div>
                      
                      <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <QrCode size={100} className="text-[#6A112A]" strokeWidth={1.5} />
                      </div>
                      
                      <p className="hidden md:block text-[10px] text-gray-400 text-center mt-6">Tunjukkan QR code ini saat registrasi ulang di lokasi event.</p>
                    </div>

                  </div>
                </div>

                {/* Footer Actions - Hide during print */}
                <div className="p-6 bg-white border-t border-gray-100 print:hidden shrink-0 flex gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-4 text-gray-600 hover:bg-gray-100 font-bold rounded-xl transition-colors border border-gray-200"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={handlePrintTicket}
                    className="flex-[2] py-4 bg-[#6A112A] hover:bg-[#851635] text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Printer size={20} />
                    Cetak Tiket PDF
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
