"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { fetchApi } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetchApi("/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || data.errors?.email?.[0] || 'Login failed')
      }

      // Set cookie for middleware
      document.cookie = `admin_token=${data.token}; path=/; max-age=86400` // 1 day
      
      // Also set localStorage as fallback if needed by other client-side tools
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user', JSON.stringify(data.user))

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      {/* Left section - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative flex-col justify-between p-12 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-tl from-indigo-800 to-blue-400 rounded-full blur-3xl opacity-30 z-0"></div>
        
        <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/30">
                <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">Stress<span className="text-blue-200">Index</span></span>
        </div>

        <div className="relative z-10 max-w-lg mt-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Akses Administrator
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Masuk untuk mengelola data proyek, kuesioner, dan menganalisis metrik stres organisasi.
          </p>
        </div>
        
        <div className="relative z-10 mt-auto">
          <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white transition-colors text-sm font-medium">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Right section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative">
          
          {/* Mobile branding */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <img src="/images/roe-icon.png" alt="StressIndex Logo" className="h-10 w-10 object-contain rounded-xl shadow-lg" />
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Stress<span className="text-blue-600">Index</span></span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Selamat Datang Kembali</h2>
            <p className="text-slate-500 text-sm">Masukkan kredensial Anda untuk melanjutkan ke dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Administrator</label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-slate-900"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 px-4 pr-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Masuk ke Dashboard'
              )}
            </Button>
          </form>
          
        </div>
      </div>
    </div>
  )
}
