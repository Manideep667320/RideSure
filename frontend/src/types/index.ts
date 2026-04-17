export interface User {
  id: string;
  firebaseUid: string;
  email?: string;
  phone?: string;
  name?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  paymentMethods?: PaymentMethod[];
}

export interface PaymentMethod {
  _id?: string;
  type: 'upi' | 'card';
  label: string;
  holderName?: string;
  upiId?: string;
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  isDefault?: boolean;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  premiumAmount: number;
  coverageLimit: number;
  status: 'active' | 'pending' | 'expired';
}

export interface Claim {
  id: string;
  policyId: string;
  amount: number;
  reason: string;
  status: 'processing' | 'approved' | 'rejected';
  createdAt: string;
}
