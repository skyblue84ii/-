/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplet, 
  Wind, 
  ShieldCheck, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Factory, 
  Users, 
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  category: 'carbon' | 'media';
  items?: string[];
  uses?: string[];
}

const products: Product[] = [
  {
    id: 'activated-carbon',
    name: '활성탄 (Activated Carbon)',
    category: 'carbon',
    description: '공기 정화, 수처리, VOC 제거 등 다양한 환경 분야에서 최적의 성능을 발휘하는 고품질 활성탄을 공급합니다.',
    items: ['입상활성탄 (8×30, 4×8, 8×12 mesh 등)', '조립활성탄 (1.5mm/Φ, 4mm/Φ)', '분말활성탄 (200, 325 mesh 등)'],
    uses: ['공기정화 및 탈취', '가스마스크 및 VOC 제거', '정수/순수/폐수 처리', '자동차 및 촉매 담체']
  },
  {
    id: 'filter-media',
    name: '수처리 여과재 (Water Treatment Media)',
    category: 'media',
    description: '이온교환수지, 안트라사이트, 여과사 등 전문적인 수처리 솔루션을 위한 최적의 여재를 제공합니다.',
    items: ['이온교환수지 (양이온, 음이온, 킬레이트 등)', '안트라사이트 (고정탄소 고함량)', '여과사(Sand) 및 여과사리(Gravel)', '범(Birm) 및 훼록스(Ferox)'],
    uses: ['수돗물 정수 및 탁도 제거', '초순수 생산 및 유해물질 제거', '철망간 제거', '공업용수 처리']
  }
];

const constructionCases = [
  { id: 1, title: '대규모 공공 정수장 여재 교체', location: '경기도 하남시', date: '2024.03' },
  { id: 2, title: '화학 공장 대기오염 방지시설 활성탄 교체', location: '충청남도 서산시', date: '2024.02' },
  { id: 3, title: '식용유 정제시설 여과 보조재 공급', location: '인천광역시', date: '2024.01' },
];

// Logo Component
const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Green part - "d" bowl */}
    <path 
      d="M40 28C20 28 8 40 8 58C8 76 20 88 40 88V28Z" 
      fill="#8BBD33" 
    />
    {/* Orange bar */}
    <rect 
      x="45" 
      y="15" 
      width="20" 
      height="80" 
      rx="10" 
      fill="#F6B133" 
    />
    {/* Blue bar */}
    <rect 
      x="72" 
      y="10" 
      width="20" 
      height="85" 
      rx="10" 
      fill="#5BA4D6" 
    />
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'carbon' | 'media'>('carbon');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Logo className="w-10 h-10 transition-transform group-hover:scale-110" />
            <span className="text-xl font-extrabold tracking-tighter text-emerald-600 drop-shadow-sm">
              (주)디에이치에코솔루션
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['제품소개', '시공사례', '견적문의', '커뮤니티'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="text-sm font-medium hover:text-emerald-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
              상담 예약하기
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['제품소개', '시공사례', '견적문의', '커뮤니티'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  onClick={toggleMenu}
                  className="text-2xl font-bold border-b border-slate-100 pb-4"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070" 
            alt="Pristine Nature" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-emerald-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm border border-emerald-400/30">
              Clean Water & Air Solution
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tighter">
              세상을 정화하는 <br />
              <span className="text-emerald-400 font-serif italic font-light">에코 솔루션</span> 파트너
            </h1>
            <p className="text-lg text-emerald-50/80 mb-8 max-w-lg leading-relaxed">
              (주)디에이치에코솔루션은 고품질 활성탄과 수처리 여과재를 통해 
              깨끗한 물과 공기, 지속 가능한 미래를 만들어 나갑니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all group">
                제품 카탈로그 보기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                견적 문의하기
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 z-10 hidden xl:flex gap-8">
          {[
            { label: '전문성', val: '20+' },
            { label: '공급 국가', val: '5+' },
            { label: '고객 만족', val: '99%' }
          ].map((stat) => (
            <div key={stat.label} className="text-white text-right">
              <div className="text-4xl font-bold">{stat.val}</div>
              <div className="text-xs font-medium text-emerald-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">최우수 품질 보장</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              엄격한 품질 관리 시스템을 통해 검증된 최고 등급의 활성탄과 여과재만을 선별하여 공급합니다.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-50">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">맞춤형 공정 솔루션</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              각 산업 현장의 특성에 맞춘 다양한 규격과 형태의 여재를 제안하여 공정 효율을 극대화합니다.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-50">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">신속한 기술 지원</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              여재 교체 시공부터 사후 관리까지, 전문 엔지니어가 신속하고 정확한 기술 서비스를 제공합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="제품소개" className="py-24 bg-emerald-900/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase block mb-3">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">주요 제품군</h2>
            </div>
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 self-start">
              <button 
                onClick={() => setActiveTab('carbon')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'carbon' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-500 hover:text-emerald-600'
                }`}
              >
                활성탄
              </button>
              <button 
                onClick={() => setActiveTab('media')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'media' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-500 hover:text-emerald-600'
                }`}
              >
                수처리 여과재
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-[400px]">
                <img 
                  src={activeTab === 'carbon' 
                    ? "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000" 
                    : "https://images.unsplash.com/photo-1540914129652-b855121c0ad1?auto=format&fit=crop&q=80&w=1000"} 
                  alt={activeTab} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-950/20" />
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-4">{products.find(p => p.category === activeTab)?.name}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  {products.find(p => p.category === activeTab)?.description}
                </p>
                
                <div className="space-y-6 mb-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.find(p => p.category === activeTab)?.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-emerald-50 group hover:border-emerald-200 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Logo className="w-5 h-5" /> 주요 활용 분야
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {products.find(p => p.category === activeTab)?.uses?.map((use, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white rounded-lg text-emerald-700 text-xs font-bold border border-emerald-100 shadow-sm">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Construction Cases */}
      <section id="시공사례" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase block mb-3">Proven Results</span>
          <h2 className="text-4xl font-bold tracking-tight">시공 및 납품 사례</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {constructionCases.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all p-6 group"
            >
              <div className="h-48 rounded-2xl bg-slate-100 mb-6 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${item.id + 10}/400/300`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {item.date}
                  </span>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-slate-500 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" /> {item.location}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="text-emerald-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            전체 사례 보기 <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Inquiry Banner */}
      <section className="py-20 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-[40px] border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-[60px] border-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            귀사의 공정에 최적화된 <br className="hidden md:block" />
            친환경 솔루션을 제안해 드립니다.
          </h2>
          <p className="text-emerald-100 mb-10 text-lg opacity-90 max-w-2xl mx-auto">
            전문적인 분석을 통해 가장 효율적인 활성탄 및 여과재 교체 주기를 진단하고 최적의 제품을 상담해 드립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 hover:bg-emerald-50 transition-all flex items-center gap-2">
              <Phone className="w-5 h-5" /> 031-485-0984
            </button>
            <button className="bg-emerald-700 text-white border border-emerald-500 px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all">
              실시간 온라인 문의
            </button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="견적문의" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase block mb-3">Contact Us</span>
            <h2 className="text-4xl font-bold tracking-tight mb-8">찾아오시는 길 & 연락처</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">본사/공장</h4>
                  <p className="text-slate-500 leading-relaxed">
                    경기도 화성시 팔탄면 율암길 95번길 70-51 <br />
                    (팔탄면 율암리 475-2)
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">대표 번호</h4>
                  <div className="text-slate-500">
                    <div className="flex justify-between w-48 mb-1">
                      <span>전화:</span> <span className="text-slate-800 font-semibold">031-485-0984</span>
                    </div>
                    <div className="flex justify-between w-48">
                      <span>팩스:</span> <span className="text-slate-800 font-semibold">031-485-0985</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">이메일</h4>
                  <p className="text-slate-800 font-semibold">skyblue18i@naver.com</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Always responding within 24h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-2xl font-bold mb-6">견적 문의</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">성함/업체명</label>
                  <input type="text" placeholder="홍길동 / (주)에코그린" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">연락처</label>
                  <input type="tel" placeholder="010-0000-0000" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">관심 제품</label>
                <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>활성탄</option>
                  <option>수처리 여과재</option>
                  <option>여재 교체 시공</option>
                  <option>기타</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">문의 내용</label>
                <textarea rows={4} placeholder="문의 내용을 입력해 주세요." className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 mt-4">
                문의 보내기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6 group">
                <Logo className="w-8 h-8" />
                <span className="text-xl font-black tracking-tighter text-emerald-400">
                  (주)디에이치에코솔루션
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm">
                깨끗한 물과 공기, 인류의 건강한 삶을 위한 최고의 정화 솔루션을 제공합니다. 
                신뢰와 정직을 바탕으로 환경 산업의 미래를 선도하겠습니다.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Twitter className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h5>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">회사소개</a></li>
                <li><a href="#제품소개" className="hover:text-emerald-400 transition-colors">활성탄</a></li>
                <li><a href="#제품소개" className="hover:text-emerald-400 transition-colors">수처리여과재</a></li>
                <li><a href="#시공사례" className="hover:text-emerald-400 transition-colors">시공현황</a></li>
                <li><a href="#견적문의" className="hover:text-emerald-400 transition-colors">견적문의</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h5>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">이메일무단수집거부</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-6 text-[10px] sm:text-xs">
            <div className="text-slate-500">
              <p>상호명: (주)디에이치에코솔루션 | 대표이사: 김동 | 사업자등록번호: [번호입력]</p>
              <p>주소: 경기도 화성시 팔탄면 율암길 95번길 70-51 | 전화: 031-485-0984 | 팩스: 031-485-0985</p>
              <p className="mt-4">© 2024 DH ECO SOLUTION. All rights reserved.</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1.5 opacity-50">
                <ShieldCheck className="w-4 h-4" /> Environment Certified
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp/Call Floating Button (Conceptual) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative">
          <MessageSquare className="w-8 h-8" />
          <span className="absolute right-full mr-4 bg-white text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold shadow-xl border border-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            실시간 상담중
          </span>
        </button>
      </div>
    </div>
  );
}
