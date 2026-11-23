
import { useState } from "react";
import {
  Search, Bell, FlaskConical, LayoutDashboard, CalendarDays,
  Bookmark, Users, ArrowUpRight, Clock, MapPin, CheckCircle2,
  X, Sparkles, Cpu, Microscope, Monitor,MessageCircle, Send, Settings, User, LogOut, ChevronDown }
 from "lucide-react";

const equipment = [
  {
    id: 1,
    name: "NVIDIA Jetson AGX Orin",
    category: "Computing",
    dept: "Computer Science",
    location: "AI Research Lab",
    status: "Available",
    icon: Cpu,
    desc: "AI development platform for robotics, computer vision and machine learning.",
    specs: "64GB RAM · GPU accelerated"
  },
  {
    id: 2,
    name: "Digital Oscilloscope",
    category: "Electronics",
    dept: "Electronics",
    location: "Electronics Lab",
    status: "Available",
    icon: Monitor,
    desc: "Precision instrument for analysing electronic signals and circuits.",
    specs: "4 channels · 500 MHz"
  },
  {
    id: 3,
    name: "Scanning Electron Microscope",
    category: "Research",
    dept: "Materials Science",
    location: "Advanced Research Centre",
    status: "Available",
    icon: Microscope,
    desc: "High-resolution imaging for advanced material and surface research.",
    specs: "High-resolution imaging"
  },
  {
    id: 4,
    name: "Prusa 3D Printer",
    category: "Prototyping",
    dept: "Mechanical Engineering",
    location: "Innovation Lab",
    status: "Available",
    icon: FlaskConical,
    desc: "Rapid prototyping and 3D printing for student projects.",
    specs: "FDM · Multiple materials"
  }
];

const opportunities = [
  {
    title: "AI for Sustainable Agriculture",
    faculty: "Dr. Meera Nair",
    dept: "Computer Science",
    type: "Research Assistant",
    tags: ["Machine Learning", "Python"]
  },
  {
    title: "Autonomous Robotics Research",
    faculty: "Prof. Arjun Rao",
    dept: "Mechanical Engineering",
    type: "Faculty Project",
    tags: ["Robotics", "Embedded Systems"]
  }
];

export default function App() {
  const [page, setPage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState("");
  const [fairEquipment, setFairEquipment] = useState(equipment[0].name);
  const [fairDate, setFairDate] = useState("");
  const [fairTime, setFairTime] = useState("10:00 AM – 12:00 PM");
  const [fairResult, setFairResult] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
const [notificationsOpen, setNotificationsOpen] = useState(false);
const [aiOpen, setAiOpen] = useState(false);
const [aiMessage, setAiMessage] = useState("");
const [chatMessages, setChatMessages] = useState([
  { role: "bot", text: "Hi! I'm LabLink AI. Ask me about lab equipment, bookings, or research opportunities." }
]);
const [settingsOpen, setSettingsOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 30 * 86400000)
    .toISOString().split("T")[0];

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  }; 
  const sendAIMessage = () => {
  const question = aiMessage.trim();
  if (!question) return;

  const q = question.toLowerCase();
  let answer;

  if (q.includes("equipment") || q.includes("device") || q.includes("gpu")) {
    answer = "LabLink has: " +
      equipment.map(item => item.name).join(", ") +
      ". Visit Discover Labs to explore them.";
  } else if (q.includes("book") || q.includes("reservation")) {
    answer = "Visit Discover Labs, select equipment, choose a date and submit your booking request. Track it in My Bookings.";
  } else if (q.includes("research") || q.includes("project") || q.includes("internship")) {
    answer = "Visit LabConnect to explore research opportunities, projects and workshops.";
  } else if (q.includes("fair") || q.includes("slot") || q.includes("conflict")) {
    answer = "Try FairSlot to explore alternative time slots when equipment bookings conflict.";
  } else {
    answer = "I can help you with equipment, bookings, research opportunities and alternative slots. What would you like to explore?";
  }

  setChatMessages(prev => [
    ...prev,
    { role: "user", text: question },
    { role: "bot", text: answer }
  ]);

  setAiMessage("");
};

  const filtered = equipment.filter(item =>
    (item.name.toLowerCase().includes(search.toLowerCase()) ||
     item.dept.toLowerCase().includes(search.toLowerCase())) &&
    (category === "All" || item.category === category)
  );

  function submitBooking(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    setBookings([
      ...bookings,
      {
        id: Date.now(),
        name: booking.name,
        project: data.get("project"),
        date: data.get("date"),
        time: data.get("time"),
        status: "Pending"
      }
    ]);
    setBooking(null);
    notify("Booking request submitted successfully!");
    setPage("My Bookings");
  }

  const navItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Discover Labs", icon: Search },
    { name: "My Bookings", icon: CalendarDays },
    { name: "FairSlot", icon: Sparkles },
    { name: "LabConnect", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-violet-600 text-white p-2 rounded-xl">
            <FlaskConical size={23}/>
          </div>
          <div>
            <h1 className="font-bold text-xl">LabLink</h1>
            <p className="text-xs text-slate-400">Discover. Access. Research.</p>
          </div>
        </div>

        <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
          Workspace
        </p>

        <nav className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setPage(item.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium ${
                  page === item.name
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon size={18}/>
                {item.name}
              </button>
            );
          })}
        </nav>

        <button
  onClick={() => setAiOpen(true)}
  className="mt-auto w-full text-left bg-violet-50 hover:bg-violet-100 rounded-2xl p-4 transition"
>
  <Sparkles className="text-violet-600 mb-2" />
  <p className="font-semibold text-sm">LabLink AI</p>
  <p className="text-xs text-slate-500 mt-1">
    Ask AI to find equipment, plan bookings and explore research.
  </p>
  <p className="text-xs text-violet-700 font-semibold mt-3">
    Open AI Assistant →
  </p>
</button>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 px-5 md:px-8 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400">Workspace / {page}</p>
            <h2 className="font-bold text-lg">{page}</h2>
          </div>
          <div className="flex items-center gap-3">
  <button
    onClick={() => setNotificationsOpen(!notificationsOpen)}
    className="p-2 rounded-xl hover:bg-slate-100 relative"
  >
    <Bell size={19} />
  </button>

  <div className="relative">
    <button
      onClick={() => setProfileOpen(!profileOpen)}
      className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold"
    >
      D
    </button>

    {profileOpen && (
      <div className="absolute right-0 top-12 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50">
        <p className="px-3 py-2 font-semibold text-sm border-b">Divya</p>

        <button
          onClick={() => {
            setPage("Settings");
            setProfileOpen(false);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 rounded-lg"
        >
          <Settings size={16} /> Settings
        </button>

        <button
          onClick={() => {
            setProfileOpen(false);
            notify("Demo account signed out.");
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    )}
  </div>

  {notificationsOpen && (
    <div className="absolute right-16 top-20 w-64 bg-white border rounded-xl shadow-lg p-4 z-50">
      <p className="font-semibold text-sm">Notifications</p>
      <p className="text-xs text-slate-500 mt-2">You're all caught up!</p>
    </div>
  )}
</div>
        </header>

        <div className="md:hidden flex gap-2 p-3 overflow-x-auto bg-white border-b">
          {navItems.map(item => (
            <button key={item.name} onClick={() => setPage(item.name)}
              className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs ${
                page === item.name ? "bg-violet-100 text-violet-700" : "bg-slate-100"
              }`}>
              {item.name}
            </button>
          ))}
        </div>

        <div className="p-5 md:p-8 max-w-7xl mx-auto">

          {page === "Overview" && (
            <>
              <div className="mb-8">
                <p className="text-violet-600 text-sm font-semibold mb-2">
                  CAMPUS RESEARCH, CONNECTED
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Your next breakthrough starts here.
                </h1>
                <p className="text-slate-500 mt-3 max-w-xl">
                  Discover specialised laboratory equipment, request access
                  and connect with research opportunities across departments.
                </p>
                <button onClick={() => setPage("Discover Labs")}
                  className="mt-6 bg-violet-600 text-white px-5 py-3 rounded-xl text-sm font-semibold">
                  Explore laboratories <ArrowUpRight className="inline ml-2" size={16}/>
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  ["Resources listed", equipment.length],
                  ["My booking requests", bookings.length],
                  ["Research opportunities", opportunities.length]
                ].map(([label, value]) => (
                  <div key={label} className="bg-white border rounded-2xl p-5">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-bold text-xl mb-4">Explore the platform</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {navItems.slice(1).map(item => {
                  const Icon = item.icon;
                  return (
                    <button key={item.name} onClick={() => setPage(item.name)}
                      className="bg-white border rounded-2xl p-5 text-left hover:border-violet-300">
                      <Icon className="text-violet-600 mb-3" size={23}/>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Explore {item.name.toLowerCase()}.
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {page === "Discover Labs" && (
            <>
              <h1 className="text-2xl font-bold mb-2">Discover resources</h1>
              <p className="text-sm text-slate-500 mb-6">
                Search specialised equipment across campus laboratories.
              </p>

              <div className="bg-white border rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3 border rounded-xl px-3">
                  <Search size={18} className="text-slate-400"/>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search equipment or department..."
                    className="w-full py-3 outline-none text-sm"/>
                </div>
                <div className="flex gap-2 flex-wrap mt-4">
                  {["All", "Computing", "Electronics", "Research", "Prototyping"].map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                      className={`px-4 py-2 rounded-lg text-xs ${
                        category === c ? "bg-violet-600 text-white" : "bg-slate-100"
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {filtered.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="bg-white border rounded-2xl p-6">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                          <Icon size={25}/>
                        </div>
                        <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-violet-600 mt-5">{item.category}</p>
                      <h3 className="font-bold text-lg mt-1">{item.name}</h3>
                      <p className="text-xs text-slate-500 mt-2">{item.dept} · {item.location}</p>
                      <p className="text-sm text-slate-500 mt-4">{item.desc}</p>
                      <button onClick={() => setSelected(item)}
                        className="mt-5 text-violet-700 text-sm font-semibold">
                        View details <ArrowUpRight className="inline" size={15}/>
                      </button>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="text-sm text-slate-500">No matching equipment found.</p>
                )}
              </div>
            </>
          )}

          {page === "My Bookings" && (
            <>
              <h1 className="text-2xl font-bold mb-2">My bookings</h1>
              <p className="text-sm text-slate-500 mb-6">Track your laboratory access requests.</p>
              {bookings.length === 0 ? (
                <div className="bg-white border rounded-2xl p-10 text-center">
                  <CalendarDays className="mx-auto text-violet-500 mb-3" size={32}/>
                  <p className="font-semibold">No booking requests yet</p>
                  <button onClick={() => setPage("Discover Labs")}
                    className="mt-4 text-violet-700 text-sm font-semibold">
                    Discover equipment
                  </button>
                </div>
              ) : bookings.map(b => (
                <div key={b.id} className="bg-white border rounded-2xl p-5 mb-3">
                  <div className="flex justify-between gap-3">
                    <h3 className="font-bold">{b.name}</h3>
                    <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full h-fit">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{b.project}</p>
                  <p className="text-xs text-slate-400 mt-2">{b.date} · {b.time}</p>
                </div>
              ))}
            </>
          )}

          {page === "FairSlot" && (
            <>
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-violet-100 text-violet-700 rounded-xl">
                    <Sparkles size={24}/>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">FairSlot</h1>
                    <p className="text-xs text-slate-500">Intelligent and fair laboratory scheduling</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 max-w-2xl">
                  Find feasible booking slots while balancing project deadlines,
                  resource availability and fair access for students.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border rounded-2xl p-6">
                  <h2 className="font-bold text-lg mb-1">Check a booking conflict</h2>
                  <p className="text-xs text-slate-500 mb-6">Enter your preferred slot.</p>

                  <label className="text-xs font-semibold block mb-2">Equipment</label>
                  <select value={fairEquipment}
                    onChange={e => {setFairEquipment(e.target.value); setFairResult(false);}}
                    className="w-full border rounded-xl p-3 text-sm mb-4">
                    {equipment.map(item => <option key={item.id}>{item.name}</option>)}
                  </select>

                  <label className="text-xs font-semibold block mb-2">Preferred date</label>
                  <input type="date" value={fairDate} min={today} max={maxDate}
                    onChange={e => {setFairDate(e.target.value); setFairResult(false);}}
                    className="w-full border rounded-xl p-3 text-sm mb-4"/>

                  <label className="text-xs font-semibold block mb-2">Preferred time</label>
                  <select value={fairTime} onChange={e => {setFairTime(e.target.value); setFairResult(false);}}
                    className="w-full border rounded-xl p-3 text-sm mb-5">
                    <option>9:00 AM – 11:00 AM</option>
                    <option>10:00 AM – 12:00 PM</option>
                    <option>11:00 AM – 1:00 PM</option>
                    <option>2:00 PM – 4:00 PM</option>
                  </select>

                  <button disabled={!fairDate} onClick={() => setFairResult(true)}
                    className="w-full bg-violet-600 disabled:bg-slate-300 text-white rounded-xl py-3 text-sm font-semibold">
                    <Sparkles size={16} className="inline mr-2"/>Find a fair slot
                  </button>
                </div>

                <div className="bg-white border rounded-2xl p-6">
                  <h2 className="font-bold text-lg mb-1">Scheduling recommendation</h2>
                  <p className="text-xs text-slate-500 mb-6">Your allocation analysis</p>

                  {!fairResult ? (
                    <div className="min-h-64 flex flex-col items-center justify-center text-center">
                      <CalendarDays size={32} className="text-violet-400 mb-4"/>
                      <p className="font-semibold text-sm">Waiting for your request</p>
                      <p className="text-xs text-slate-400 mt-2">Choose a date and check your preferred slot.</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5">
                        <div className="font-semibold text-sm text-amber-800">Potential scheduling conflict</div>
                        <p className="text-xs text-amber-800 mt-2">
                          Demonstration simulation only. This does not check live laboratory availability.
                        </p>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">YOUR REQUEST</p>
                      <p className="font-semibold text-sm">{fairEquipment}</p>
                      <p className="text-xs text-slate-500 mt-1 mb-5">{fairDate} · {fairTime}</p>
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                        <p className="font-semibold text-sm text-emerald-800">Suggested alternative</p>
                        <p className="text-xl font-bold text-emerald-900 mt-3">2:00 PM – 4:00 PM</p>
                        <p className="text-xs text-emerald-800 mt-2">Alternative window proposed for the demo.</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-4">Final allocation requires faculty confirmation.</p>
                      <button onClick={() => {
                        setBooking(equipment.find(item => item.name === fairEquipment));
                        setFairResult(false);
                      }} className="w-full mt-5 bg-violet-600 text-white rounded-xl py-3 text-sm font-semibold">
                        Continue to booking request
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {page === "LabConnect" && (
            <>
              <h1 className="text-2xl font-bold mb-2">LabConnect</h1>
              <p className="text-sm text-slate-500 mb-7">
                Find research opportunities and collaborate with faculty across departments.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {opportunities.map(o => (
                  <div key={o.title} className="bg-white border rounded-2xl p-6">
                    <div className="text-xs text-violet-600 uppercase font-semibold mb-3">{o.type}</div>
                    <h3 className="font-bold text-lg mb-2">{o.title}</h3>
                    <p className="text-xs text-slate-500 mb-5">{o.faculty} · {o.dept}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {o.tags.map(t => (
                        <span key={t} className="text-xs bg-slate-100 rounded-lg px-3 py-1.5">{t}</span>
                      ))}
                    </div>
                    <button onClick={() => notify("Interest recorded for this demo.")}
                      className="bg-violet-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold">
                      Express interest <ArrowUpRight className="inline ml-1" size={14}/>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
            {aiOpen && (
        <div className="fixed bottom-5 right-5 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">
          <div className="bg-violet-700 text-white p-4 flex justify-between">
            <div>
              <p className="font-bold">✨ LabLink AI</p>
              <p className="text-xs text-violet-200">Campus Assistant · Demo</p>
            </div>
            <button onClick={() => setAiOpen(false)}>
              <X size={20}/>
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl text-sm ${
                  message.role === "user"
                    ? "bg-violet-100 ml-6"
                    : "bg-slate-100 mr-6"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendAIMessage();
            }}
            className="border-t p-3 flex gap-2"
          >
            <input
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask LabLink AI..."
              className="flex-1 min-w-0 border rounded-lg p-2 text-sm"
            />
            <button type="submit" className="bg-violet-700 text-white p-3 rounded-lg">
              <Send size={17}/>
            </button>
          </form>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-40 bg-slate-950/50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl p-7 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-start mb-5">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                <selected.icon size={28}/>
              </div>
              <button onClick={() => setSelected(null)}><X size={20}/></button>
            </div>
            <div className="text-xs text-violet-600 font-semibold uppercase mb-2">{selected.category}</div>
            <h2 className="text-2xl font-bold mb-3">{selected.name}</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">{selected.desc}</p>
            <div className="space-y-3 text-sm mb-7">
              <div className="flex gap-3"><MapPin size={17}/>{selected.location}</div>
              <div className="flex gap-3"><FlaskConical size={17}/>{selected.dept}</div>
              <div className="flex gap-3"><CheckCircle2 size={17}/>{selected.specs}</div>
            </div>
            <button onClick={() => {setBooking(selected); setSelected(null);}}
              className="w-full bg-violet-600 text-white rounded-xl py-3 font-semibold text-sm">
              Request a booking
            </button>
          </div>
        </div>
      )}

      {booking && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4">
          <form onSubmit={submitBooking} className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-bold">Request lab access</h2>
              <button type="button" onClick={() => setBooking(null)}><X/></button>
            </div>
            <p className="text-sm text-slate-500 mb-5">{booking.name}</p>
            <label className="text-xs font-semibold block mb-2">Project title</label>
            <input name="project" required placeholder="e.g. Smart agriculture system"
              className="w-full border rounded-xl p-3 text-sm mb-4"/>
            <label className="text-xs font-semibold block mb-2">Preferred date</label>
            <input name="date" type="date" required min={today} max={maxDate}
              className="w-full border rounded-xl p-3 text-sm mb-4"/>
            <label className="text-xs font-semibold block mb-2">Preferred time</label>
            <select name="time" className="w-full border rounded-xl p-3 text-sm mb-6">
              <option>9:00 AM – 11:00 AM</option>
              <option>11:00 AM – 1:00 PM</option>
              <option>2:00 PM – 4:00 PM</option>
            </select>
            <button className="w-full bg-violet-600 text-white rounded-xl py-3 font-semibold text-sm">
              Submit booking request
            </button>
          </form>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] bg-slate-900 text-white rounded-xl px-5 py-3 shadow-xl text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
