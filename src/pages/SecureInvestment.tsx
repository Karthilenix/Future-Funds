import { Shield, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecureInvestment = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/');
    };

    return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
        <div className="text-center space-y-4">
        <Shield className="h-16 w-16 text-blue-600 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900">Secure Investment</h1>
        <p className="text-xl text-gray-600">Your investments are protected with bank-level security</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Advanced Security Features</h2>
        <ul className="space-y-4">
            {[
                'Two-factor authentication (2FA)',
                'End-to-end encryption',
                'Regular security audits',
                'Fraud detection systems',
                'Secure socket layer (SSL) protection'
            ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
                </li>
            ))}
            </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Protection Measures</h2>
            <div className="space-y-6">
            <div className="flex items-start space-x-4">
                <Lock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                <h3 className="font-semibold mb-2">Account Protection</h3>
                <p className="text-gray-600">Your account is protected by multiple layers of security, including biometric authentication and encrypted passwords.</p>
            </div>
            </div>
            <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                <h3 className="font-semibold mb-2">Investment Insurance</h3>
                <p className="text-gray-600">All investments are insured up to $500,000 through our partnership with leading insurance providers.</p>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div className="bg-blue-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Our Security Commitment</h2>
        <p className="text-gray-700 leading-relaxed">
            At Future Funds, we prioritize the security of your investments above all else. Our platform 
            employs state-of-the-art security measures and follows industry best practices to ensure your 
            financial data and transactions remain protected at all times. We regularly update our security 
            protocols and conduct thorough audits to maintain the highest standards of protection.
        </p>
    </div>

    <div className="flex justify-center">
        <button
            onClick={handleContinue}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
            Continue
        </button>
    </div>
    </div>
);
};

export default SecureInvestment;