import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onNavigateLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigateLogin }) => {
  const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
  const [email, setEmail] = useState('usuario@ejemplo.com');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 450);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 450);
  };

  return (
    <main
      className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden my-auto"
      data-purpose="recovery-card-container"
      id="recovery-main-container"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Editorial Panel */}
        <section
          className="lg:col-span-5 p-4 md:p-5 flex flex-col"
          data-purpose="editorial-branding-panel"
          id="recovery-editorial-panel"
        >
          <div className="relative w-full h-full bg-gradient-to-b from-[#07152B] via-[#0A1F3E] to-[#0E2952] rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between text-white border border-slate-800/40">
            <div className="relative z-10 space-y-4">
              <div
                id="recovery-pill"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-medium text-blue-200 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Restablecimiento seguro • Código cifrado</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-snug">
                Recupera el acceso a tus consultas
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Te enviaremos un código de un solo uso para verificar tu identidad y restablecer tus credenciales de forma segura.
              </p>
            </div>

            {/* Editorial Conceptual 3D Image */}
            <div
              className="relative mt-8 -mb-10 -mx-6 sm:-mx-8 flex justify-center items-end"
              data-purpose="conceptual-visual"
              id="recovery-conceptual-visual"
            >
              <div className="absolute inset-0 bg-blue-500/15 rounded-full filter blur-3xl pointer-events-none transform -translate-y-6"></div>
              <img
                id="recovery-glass-calendar"
                alt="Visual editorial de calendario médico translúcido"
                className="relative z-10 w-full max-h-[320px] object-cover object-top visual-image-mask drop-shadow-2xl select-none pointer-events-none opacity-95"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnkebvjTzdh3ta8B2gR0PdMFQQ2VjzYFr9gZvA_ay2_eaOtaLzR0yQS5o9r-3xt3OsJPfnE2G2PECJ5DVawKJ2ITtroIRVLhq2Y_J_K9EOgQFRq7PLWDnw1x_aiL2BvX-GxeFbzzgVKspZHGS1qYTS6PHBqJ1d5upBpoaLptAW0d1NKh37PNmcYfbGDI4BDd8WooB745FZ44DbtHB42v7dyTuW1-sdjGVj-dzWP93Ni2zxXYJTdX_SLg"
              />
            </div>
          </div>
        </section>

        {/* Right Form Panel */}
        <section
          className="lg:col-span-7 px-8 py-10 sm:px-12 sm:py-12 md:px-14 flex flex-col justify-between bg-white"
          data-purpose="recovery-form-panel"
          id="recovery-form-panel"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
                  <KeyRound className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-base font-bold tracking-tight text-slate-900 block leading-tight">
                    Portal de Citas
                  </span>
                  <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    Recuperación
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="recovery-back-btn"
                onClick={onNavigateLogin}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Login</span>
              </button>
            </div>

            {step === 'email' && (
              <div>
                <div className="mb-7">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    ¿Olvidaste tu contraseña?
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    Ingresa el correo electrónico asociado a tu cuenta de paciente para recibir el código de verificación.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleRequestCode}>
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                      htmlFor="recovery-email"
                    >
                      Correo electrónico registrado
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <input
                        className="input-transition block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        id="recovery-email"
                        placeholder="usuario@ejemplo.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow-md shadow-blue-500/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer flex items-center justify-center gap-2"
                    id="request-code-btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Enviando código...</span>
                      </>
                    ) : (
                      <span>Enviar Código de Seguridad</span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {step === 'code' && (
              <div>
                <div className="mb-6">
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md mb-2">
                    Código enviado a: {email}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Introduce el Código y Nueva Clave
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Ingresa el código numérico de 6 dígitos que enviamos a tu bandeja de entrada (simulación: ingresa cualquier 6 dígitos).
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleResetPassword}>
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                      htmlFor="otp-code"
                    >
                      Código de Verificación (6 dígitos)
                    </label>
                    <input
                      className="input-transition block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-center text-lg font-mono tracking-widest text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      id="otp-code"
                      maxLength={6}
                      placeholder="728194"
                      required
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                      htmlFor="new-pwd"
                    >
                      Nueva Contraseña
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <input
                        className="input-transition block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        id="new-pwd"
                        placeholder="Nueva contraseña segura"
                        required
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow-md shadow-blue-500/15 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    id="save-new-pwd-btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Actualizando...</span>
                      </>
                    ) : (
                      <span>Restablecer Contraseña</span>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-xs text-slate-500 hover:text-blue-600 cursor-pointer"
                    >
                      Reenviar código a otro correo
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  ¡Contraseña Actualizada!
                </h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6">
                  Tu contraseña ha sido restablecida exitosamente. Ahora puedes ingresar con tus nuevas credenciales.
                </p>
                <button
                  type="button"
                  id="success-login-btn"
                  onClick={onNavigateLogin}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm cursor-pointer"
                >
                  Iniciar Sesión Ahora
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] leading-tight text-slate-400">
                Protocolo de autenticación médica con encriptación TLS de 256 bits.
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
