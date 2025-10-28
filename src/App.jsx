import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import CalendarView from './components/CalendarView';
import CustomerList from './components/CustomerList';
import { BarChart2 } from 'lucide-react';

function App() {
  const [brandOn, setBrandOn] = useState(true);
  const [activeTab, setActiveTab] = useState('book');
  const [bookings, setBookings] = useState([]);

  const customers = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      if (!map.has(b.phone)) {
        map.set(b.phone, { id: b.phone, name: b.name, phone: b.phone, next: { date: b.date, time: b.time } });
      } else {
        const existing = map.get(b.phone);
        // take the most recent booking as next for demo
        if (new Date(`${b.date}T${b.time}`) > new Date(`${existing.next.date}T${existing.next.time}`)) {
          existing.next = { date: b.date, time: b.time };
        }
      }
    });
    return Array.from(map.values());
  }, [bookings]);

  const addBooking = (b) => {
    setBookings((prev) => [...prev, b]);
    setActiveTab('calendar');
  };

  return (
    <div className={`min-h-screen ${brandOn ? 'bg-gradient-to-b from-rose-50 to-white' : 'bg-gray-50'}`}>
      <Header brandOn={brandOn} onToggleBrand={() => setBrandOn((v) => !v)} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 gap-6">
        {activeTab === 'book' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><BookingForm onCreate={addBooking} brandOn={brandOn} /></div>
            <div className="lg:col-span-1"><CalendarView bookings={bookings} brandOn={brandOn} /></div>
          </div>
        )}

        {activeTab === 'calendar' && <CalendarView bookings={bookings} brandOn={brandOn} />}

        {activeTab === 'customers' && <CustomerList customers={customers} brandOn={brandOn} />}

        {activeTab === 'admin' && (
          <section>
            <div className={`rounded-xl border p-4 sm:p-6 ${brandOn ? 'border-rose-200 bg-rose-50/40' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><BarChart2 className="w-5 h-5" /> Dashboard</h2>
                <span className="text-xs text-gray-500">Local demo • No backend connected</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white border border-gray-200">
                  <div className="text-xs text-gray-500">Bookings</div>
                  <div className="text-2xl font-semibold">{bookings.length}</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-gray-200">
                  <div className="text-xs text-gray-500">Customers</div>
                  <div className="text-2xl font-semibold">{customers.length}</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-gray-200">
                  <div className="text-xs text-gray-500">Revenue (est.)</div>
                  <div className="text-2xl font-semibold">₹{bookings.reduce((s, b) => s + (b.price || 0), 0)}</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-gray-200">
                  <div className="text-xs text-gray-500">Paid ratio</div>
                  <div className="text-2xl font-semibold">
                    {bookings.length === 0 ? '—' : `${Math.round((bookings.filter((b) => b.paid).length / bookings.length) * 100)}%`}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarView bookings={bookings} brandOn={brandOn} />
              <CustomerList customers={customers} brandOn={brandOn} />
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-xs text-gray-500">
        Made for local salons • Payments via Razorpay and WhatsApp reminders can be enabled when connected to the backend.
      </footer>
    </div>
  );
}

export default App;
