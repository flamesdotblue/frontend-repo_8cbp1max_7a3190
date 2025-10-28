import React from 'react';
import { Users, MessageCircle, Phone, Mail } from 'lucide-react';

const whatsappUrl = (phone, message) => {
  const p = (phone || '').replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${p}?text=${text}`;
};

const nextAppointmentText = (customer) => {
  const when = customer.next?.date && customer.next?.time ? `${customer.next.date} at ${customer.next.time}` : 'your upcoming appointment';
  return `Hi ${customer.name}, this is a reminder from Salon Studio for ${when}. Reply YES to confirm or call us if you need to reschedule. 💇‍♀️`;
};

const CustomerList = ({ customers = [], brandOn }) => {
  return (
    <section className="w-full">
      <div className={`rounded-xl border p-4 sm:p-6 ${brandOn ? 'border-rose-200 bg-rose-50/40' : 'border-gray-200 bg-white'}`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" /> Customers
        </h2>
        {customers.length === 0 ? (
          <p className="text-sm text-gray-600">No customers yet. New customers will appear here after bookings.</p>
        ) : (
          <ul className="divide-y rounded-lg border overflow-hidden">
            {customers.map((c) => (
              <li key={c.id} className="p-3 sm:p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-gray-900 font-medium truncate">{c.name}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-4 mt-1">
                    <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {c.phone}</span>
                    {c.email && <span className="inline-flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {c.email}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={whatsappUrl(c.phone, nextAppointmentText(c))}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                      brandOn ? 'bg-rose-600 text-white' : 'bg-gray-900 text-white'
                    }`}
                    title="Send WhatsApp reminder"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CustomerList;
