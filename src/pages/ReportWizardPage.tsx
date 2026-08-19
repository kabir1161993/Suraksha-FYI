import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../services/store';
import { scanImageForFSSAI } from '../services/ocrService';
import { HazardCategory, OutletCategory, MerchantResponse, RequestedAction, HazardSeverity } from '../types';
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  Copy, 
  Share2, 
  Bell, 
  MessageSquare,
  ShieldAlert,
  Bug,
  Ghost,
  CalendarX,
  FlaskConical,
  Store,
  HelpCircle
} from 'lucide-react';

export const ReportWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isScanningOCR, setIsScanningOCR] = useState<boolean>(false);

  // Form State
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80');
  const [fssaiLicense, setFssaiLicense] = useState<string>('');
  const [ocrDetected, setOcrDetected] = useState<boolean>(false);
  
  const [city, setCity] = useState<string>('Bengaluru');
  const [ward, setWard] = useState<string>('Koramangala Ward 68');
  const [lat, setLat] = useState<number>(12.9352);
  const [lng, setLng] = useState<number>(77.6244);
  const [outletCategory, setOutletCategory] = useState<OutletCategory>('Cloud Kitchen');
  const [fboName, setFboName] = useState<string>('');

  const [hazardPrimary, setHazardPrimary] = useState<HazardCategory>('FOREIGN_OBJECT');
  const [hazardSeverity, setHazardSeverity] = useState<HazardSeverity>('P0_CRITICAL');
  const [userDescription, setUserDescription] = useState<string>('');

  const [merchantResponse, setMerchantResponse] = useState<MerchantResponse>('They ignored me');
  const [refundReceived, setRefundReceived] = useState<boolean>(false);
  const [actionRequested, setActionRequested] = useState<RequestedAction>('FSO inspection');

  // Confirmation State
  const [submittedReportId, setSubmittedReportId] = useState<string>('');

  // Handle Photo Selection & OCR Scan
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setPhotoUrl(localUrl);

      setIsScanningOCR(true);
      const detectedLicense = await scanImageForFSSAI(file);
      setIsScanningOCR(false);

      if (detectedLicense) {
        setFssaiLicense(detectedLicense);
        setOcrDetected(true);
      }
    }
  };

  // Submit Final Report
  const handleSubmitReport = () => {
    let calculatedSeverity: HazardSeverity = 'P1_MODERATE';
    if (hazardPrimary === 'FOREIGN_OBJECT' || hazardPrimary === 'FOOD_POISONING' || hazardPrimary === 'VEG_NONVEG_CONTAMINATION' || hazardPrimary === 'CHEMICAL_ADULTERANT') {
      calculatedSeverity = 'P0_CRITICAL';
    } else if (hazardPrimary === 'PDS_ADULTERATION' || hazardPrimary === 'UNHYGIENIC_KITCHEN') {
      calculatedSeverity = 'P2_ADVISORY';
    }

    const created = store.addIncident({
      city: city || 'Bengaluru',
      state: 'Karnataka',
      ward: ward || 'Koramangala Ward 68',
      lat,
      lng,
      fbo_name: fboName || 'Local Food Merchant',
      fbo_slug: (fboName || 'local-food-merchant').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      fssai_license: fssaiLicense || '11223344556677',
      fssai_verified: !!fssaiLicense,
      category: outletCategory,
      hazard_primary: hazardPrimary,
      hazard_severity: calculatedSeverity,
      user_description: userDescription || 'Contaminated food incident reported.',
      evidence_url: photoUrl,
      phash_flags: [],
      merchant_response: merchantResponse,
      refund_received: refundReceived,
      action_requested: actionRequested,
      moderation_status: 'APPROVED',
      auto_approved: true,
      ddo_email: 'ddo.karnataka.bangalore@fssai.gov.in'
    });

    setSubmittedReportId(created.incident_id);
    setCurrentStep(5);
  };

  return (
    <div className="container" style={{ maxWidth: '640px', padding: '2rem 1rem' }}>
      
      {/* Wizard Header Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <button 
            onClick={() => currentStep > 1 && currentStep < 5 && setCurrentStep(currentStep - 1)}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}
            disabled={currentStep === 1 || currentStep === 5}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F59E0B' }}>
            Step {currentStep} of 5
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '0.375rem', height: '6px', borderRadius: '3px', overflow: 'hidden', backgroundColor: '#E2E8F0' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              style={{ 
                flex: 1, 
                backgroundColor: s <= currentStep ? '#F59E0B' : 'transparent',
                transition: 'background-color 0.3s ease'
              }} 
            />
          ))}
        </div>
      </div>

      {/* STEP 1: MEDIA CAPTURE */}
      {currentStep === 1 && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Camera color="#F59E0B" /> Step 1: Add Photo Evidence
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Required for public moderation & FSO verification. Snap or upload clear photo.
          </p>

          <div style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            backgroundColor: '#0F172A',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #334155'
          }}>
            {photoUrl ? (
              <img src={photoUrl} alt="Evidence preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', color: '#94A3B8' }}>
                <Camera size={48} color="#F59E0B" style={{ marginBottom: '0.5rem' }} />
                <div>Tap camera icon to capture</div>
              </div>
            )}

            {isScanningOCR && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                fontSize: '0.875rem'
              }}>
                <Sparkles size={20} className="animate-spin" /> Scanning image for FSSAI license...
              </div>
            )}
          </div>

          {ocrDetected && (
            <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '0.5rem', fontSize: '0.8125rem', color: '#B45309', marginBottom: '1.25rem' }}>
              📋 <strong>OCR Detected FSSAI License:</strong> {fssaiLicense} (Pre-filled in Step 2)
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <label className="btn-secondary" style={{ flex: 1, justifyContent: 'center', cursor: 'pointer' }}>
              <Upload size={18} /> Upload Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <button 
            onClick={() => setCurrentStep(2)} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Next: Confirm Location <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 2: LOCATION & OUTLET CONFIRM */}
      {currentStep === 2 && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <MapPin color="#F59E0B" /> Step 2: Confirm Location & Outlet
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Auto-detected GPS tags your city & municipal ward.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                Restaurant / Outlet Name *
              </label>
              <input 
                type="text" 
                placeholder="e.g. Zomato Cloud Kitchen, Royal Biryani House..." 
                value={fboName}
                onChange={(e) => setFboName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                Outlet Category *
              </label>
              <select 
                value={outletCategory}
                onChange={(e) => setOutletCategory(e.target.value as OutletCategory)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#fff' }}
              >
                <option value="Restaurant / Café">Restaurant / Dhaba / Café</option>
                <option value="Cloud Kitchen">Cloud Kitchen / Delivery Only</option>
                <option value="Street Vendor / Stall">Street Vendor / Stall</option>
                <option value="Packaged Food">Packaged Food / Supermarket</option>
                <option value="PDS / Ration Shop">PDS / Ration Shop</option>
                <option value="Sweet Shop / Mithai">Sweet Shop / Mithai</option>
                <option value="Temple Kitchen">Temple / Community Kitchen</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                  City
                </label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                  Area / Ward
                </label>
                <input 
                  type="text" 
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                FSSAI License # (Optional 14-digits)
              </label>
              <input 
                type="text" 
                placeholder="11223344556677" 
                value={fssaiLicense}
                onChange={(e) => setFssaiLicense(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>

          <button 
            onClick={() => setCurrentStep(3)} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={!fboName}
          >
            Next: Select Hazard Type <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 3: HAZARD TYPE SELECT */}
      {currentStep === 3 && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <AlertTriangle color="#F59E0B" /> Step 3: What did you find?
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Tap the primary hazard category.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { id: 'FOREIGN_OBJECT', label: 'Foreign Object', sub: 'Insect / Hair / Metal / Glass', icon: '🐛', color: '#DC2626' },
              { id: 'VEG_NONVEG_CONTAMINATION', label: 'Veg / Non-Veg Mix', sub: 'Meat found in veg food', icon: '🟣', color: '#7C3AED' },
              { id: 'FOOD_POISONING', label: 'Food Poisoning', sub: 'Got sick / Hospitalized', icon: '🤢', color: '#DC2626' },
              { id: 'SPOILED_MOLD', label: 'Spoilage / Mold', sub: 'Foul odor / Rotten', icon: '🦠', color: '#F59E0B' },
              { id: 'EXPIRED_PRODUCT', label: 'Expired Product', sub: 'Past expiry / Mislabeled', icon: '📅', color: '#F59E0B' },
              { id: 'CHEMICAL_ADULTERANT', label: 'Adulteration', sub: 'Synthetic milk / Dye', icon: '🧪', color: '#DC2626' },
              { id: 'PEST_RODENT', label: 'Pest Infestation', sub: 'Rat / Cockroach evidence', icon: '🐀', color: '#F59E0B' },
              { id: 'PDS_ADULTERATION', label: 'PDS Ration Issue', sub: 'Weevil grain / Shortweight', icon: '🏪', color: '#3B82F6' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setHazardPrimary(item.id as HazardCategory)}
                style={{
                  padding: '0.875rem',
                  borderRadius: '0.5rem',
                  border: hazardPrimary === item.id ? `2px solid ${item.color}` : '1px solid #CBD5E1',
                  backgroundColor: hazardPrimary === item.id ? `${item.color}10` : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
              Describe in your own words (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Found a cockroach inside packed biryani container..."
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', outline: 'none' }}
            />
          </div>

          <button 
            onClick={() => setCurrentStep(4)} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Next: Resolution Outcome <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 4: RESOLUTION OUTCOME */}
      {currentStep === 4 && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <HelpCircle color="#F59E0B" /> Step 4: Merchant Outcome & Action
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
            What happened when you informed the seller?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                Merchant Response
              </label>
              {[
                'Haven\'t told them yet',
                'They replaced / refunded',
                'Acknowledged but didn\'t fix',
                'They denied the problem',
                'They ignored me'
              ].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#334155', marginBottom: '0.375rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="merchantResponse" 
                    checked={merchantResponse === opt}
                    onChange={() => setMerchantResponse(opt as MerchantResponse)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                Did you receive a refund?
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => setRefundReceived(true)}
                  className={refundReceived ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setRefundReceived(false)}
                  className={!refundReceived ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  No / Not Offered
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                What action are you requesting?
              </label>
              <select
                value={actionRequested}
                onChange={(e) => setActionRequested(e.target.value as RequestedAction)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', backgroundColor: '#fff' }}
              >
                <option value="Public awareness only">Public awareness only (Live map pin)</option>
                <option value="FSO inspection">FSO Inspection trigger (Cluster alert)</option>
                <option value="Formal FSSAI complaint">Formal FSSAI regulatory complaint</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleSubmitReport} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}
          >
            Submit & Publish to Live Map <CheckCircle2 size={18} />
          </button>
        </div>
      )}

      {/* STEP 5: CONFIRMATION (< 25 SECONDS REACHED) */}
      {currentStep === 5 && (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#F0FDF4',
            color: '#16A34A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            border: '2px solid #BBF7D0'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
            Your Report is Live!
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Published to the public hazard map within 5 seconds.
          </p>

          {/* Copyable Report ID Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#FEF3C7',
            color: '#B45309',
            border: '1px solid #FDE68A',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>
            Report ID: {submittedReportId}
            <button 
              onClick={() => navigator.clipboard.writeText(submittedReportId)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B45309' }}
              title="Copy ID"
            >
              <Copy size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => {
                const text = `I just reported a food safety hazard at ${fboName || 'a local restaurant'} on Suraksha.fyi in 25 seconds with zero login! See it on map: ${window.location.origin}/map`;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="btn-primary" 
              style={{ backgroundColor: '#25D366', color: '#fff', justifyContent: 'center' }}
            >
              <MessageSquare size={18} /> Share on WhatsApp
            </button>

            <button 
              onClick={() => navigate('/map')} 
              className="btn-secondary" 
              style={{ justifyContent: 'center' }}
            >
              <MapPin size={18} /> View Pin on Live Map
            </button>

            <button 
              onClick={() => navigate('/my-reports')} 
              className="btn-secondary" 
              style={{ justifyContent: 'center' }}
            >
              Track Status in My Reports
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
