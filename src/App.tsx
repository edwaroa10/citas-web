import React, { useState, useEffect } from 'react';
import { ScreenType, User, Appointment } from './types';
import { INITIAL_USER, INITIAL_APPOINTMENTS } from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { BookAppointmentModal } from './components/BookAppointmentModal';
import { AppointmentDetailModal } from './components/AppointmentDetailModal';
import { TopBarNavigation } from './components/TopBarNavigation';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('portal_citas_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('portal_citas_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('portal_citas_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('portal_citas_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
    showToast(`¡Bienvenido/a de nuevo, ${user.name}!`);
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
    showToast(`¡Cuenta creada exitosamente! Bienvenido, ${user.name}.`);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    showToast('Has cerrado sesión correctamente.');
  };

  const handleBookAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
    showToast(`Cita confirmada con ${newApt.doctorName} para el ${newApt.date}.`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelada' } : apt))
    );
    showToast('La cita médica ha sido cancelada.');
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, date: newDate, time: newTime } : apt))
    );
    showToast(`Cita reprogramada con éxito para el ${newDate} a las ${newTime}.`);
  };

  return (
    <div
      className="min-h-screen bg-[#F1F4F9] text-slate-800 flex flex-col items-center justify-center p-3 sm:p-6 md:p-10 font-sans selection:bg-blue-600 selection:text-white"
      id="portal-citas-app-root"
    >
      {/* Toast notification banner */}
      {toastMessage && (
        <div
          id="portal-toast"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Render */}
      {currentScreen === 'login' && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onNavigateRegister={() => setCurrentScreen('register')}
          onNavigateForgotPassword={() => setCurrentScreen('forgot-password')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'forgot-password' && (
        <ForgotPasswordScreen onNavigateLogin={() => setCurrentScreen('login')} />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen
          user={currentUser}
          appointments={appointments}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenDetail={(apt) => setSelectedAppointment(apt)}
          onLogout={handleLogout}
        />
      )}

      {/* Booking Modal */}
      <BookAppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onAppointmentBooked={handleBookAppointment}
        patientName={currentUser.name}
        patientId={currentUser.id}
      />

      {/* Appointment Detail & Actions Modal */}
      <AppointmentDetailModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onCancelAppointment={handleCancelAppointment}
        onRescheduleAppointment={handleRescheduleAppointment}
      />

      {/* Floating Screen Switcher for seamless testing & navigation */}
      <TopBarNavigation
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />
    </div>
  );
}
