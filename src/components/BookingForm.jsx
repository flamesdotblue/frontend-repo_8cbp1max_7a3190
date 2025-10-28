import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, NotebookText, CreditCard, CheckCircle2 } from 'lucide-react';

const defaultServices = [
  { id: 'haircut', name: 'Haircut', duration: 30, price: 499 },
  { id: 'coloring', name: 'Hair Coloring', duration: 60, price: 1499 },
  { id: 'styling', name: 'Hair Styling', duration: 45, price: 899 },
  { id: 'mani', name: 'Manicure', duration: 40, price: 699 },
];

const BookingForm = ({ onCreate, brandOn }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: defaultServices[0].id,
    date: '',
    time: '',
    notes: '',
    paid: false,
  });
  const [confirm, setConfirm] = useState(false);

  const service = defaultServices.find((s) => s.id === form.service);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) return;

    const booking = {
      id: `${Date.now()}`,
      ...form,
      serviceName: service?.name,
      price: service?.price ?? 0,
      createdAt: new Date().toISOString(),
    };
    onCreate(booking);
    setConfirm(false);
    setForm({ name: '', phone: '', service: defaultServices[0].id, date: '', time: '', notes: '', paid: false });
  };

  const handlePayNow = () => {
    // Placeholder UX for payment integration. In production, this should open Razorpay Checkout.
    // We mark as paid for demo purposes.
    setForm((f) => ({ ...f, paid: true }));
  };

  return (
    <section className="w-full">
      <div className={`rounded-xl border p-4 sm:p-6 ${brandOn ? 'border-rose-200 bg-rose-50/40' : 'border-gray-200 bg-white'}`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Book an Appointment
        </h2>
        <form onSubmit={(e) => { setConfirm(true); e.preventDefault(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600 flex items-center gap-1"><User className="w-4 h-4" /> Full name</span>
            <input
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600 flex items-center gap-1"><Phone className="w-4 h-4" /> Phone</span>
            <input
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Service</span>
            <select
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              {defaultServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} • {s.duration}m • ₹{s.price}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600 flex items-center gap-1"><Calendar className="w-4 h-4" /> Date</span>
              <input
                type="date"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600 flex items-center gap-1"><Clock className="w-4 h-4" /> Time</span>
              <input
                type="time"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </label>
          </div>

          <label className="md:col-span-2 flex flex-col gap-1">
            <span className="text-sm text-gray-600 flex items-center gap-1"><NotebookText className="w-4 h-4" /> Notes (optional)</span>
            <textarea
              rows={3}
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Any preferences we should know?"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>

          <div className="md:col-span-2 flex items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              <div>Selected: <span className="font-medium">{service?.name}</span> • {service?.duration} min</div>
              <div className="text-gray-900 font-semibold">Total: ₹{service?.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePayNow}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium border ${
                  form.paid
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : brandOn
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-gray-900 text-white border-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                {form.paid ? 'Paid' : 'Pay now'}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-50"
              >
                <CheckCircle2 className="w-4 h-4" /> Confirm
              </button>
            </div>
          </div>
        </form>

        {confirm && (
          <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700">Confirm booking for <span className="font-medium">{form.name || '—'}</span> on <span className="font-medium">{form.date || '—'}</span> at <span className="font-medium">{form.time || '—'}</span>.</p>
              <p className="text-xs text-gray-500">Payment status: {form.paid ? 'Paid' : 'Unpaid'}</p>
            </div>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${brandOn ? 'bg-rose-600 text-white' : 'bg-gray-900 text-white'}`}
            >
              Create Booking
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
