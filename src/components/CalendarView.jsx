import React from 'react';
import { CalendarDays, Clock, User, Phone } from 'lucide-react';

const groupByDate = (items) => {
  const map = new Map();
  items.forEach((b) => {
    const k = b.date || 'Unscheduled';
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(b);
  });
  // sort by date asc
  const sorted = Array.from(map.entries()).sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));
  return sorted;
};

const CalendarView = ({ bookings = [], brandOn }) => {
  const groups = groupByDate(bookings);

  return (
    <section className="w-full">
      <div className={`rounded-xl border p-4 sm:p-6 ${brandOn ? 'border-rose-200 bg-rose-50/40' : 'border-gray-200 bg-white'}`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5" /> Upcoming Appointments
        </h2>
        {groups.length === 0 ? (
          <p className="text-sm text-gray-600">No bookings yet. New bookings will appear here.</p>
        ) : (
          <div className="space-y-6">
            {groups.map(([date, list]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-gray-500 mb-2">{date}</h3>
                <div className="divide-y rounded-lg border overflow-hidden">
                  {list
                    .slice()
                    .sort((a, b) => (a.time > b.time ? 1 : -1))
                    .map((b) => (
                      <div key={b.id} className="p-3 sm:p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-gray-900 font-medium truncate">
                            <User className="w-4 h-4" /> {b.name}
                            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{b.serviceName}</span>
                          </div>
                          <div className="text-xs text-gray-600 flex items-center gap-4 mt-1">
                            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.time}</span>
                            <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {b.phone}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs font-semibold ${b.paid ? 'text-emerald-700' : 'text-amber-700'}`}>{b.paid ? 'Paid' : 'Payment due'}</div>
                          <div className="text-sm">₹{b.price}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CalendarView;
