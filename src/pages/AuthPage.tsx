import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Simple Label component since we haven't created one yet
function SimpleLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {children}
        </label>
    );
}

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup } = useAuth();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (login(email, password)) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        signup(name, email, password);
        setSuccess('Account created successfully! Please log in with your credentials.');
        setIsLogin(true);
        // Clear sensitive fields but keep email for convenience
        setPassword('');
    };

    return (

        <div className="min-h-[calc(100vh-4rem)] grid md:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col justify-center items-center bg-muted/30 p-10 border-r">
                <div className="flex flex-col items-center gap-6 max-w-md text-center">
                    <motion.img
                        src="/src/assets/logo.png"
                        alt="SmartLearn Logo"
                        className="h-32 w-auto drop-shadow-lg mix-blend-screen"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            SmartLearn
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Master coding with interactive lessons, real-time practice, and a smart learning path.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? 'login' : 'signup'}
                            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="w-full backdrop-blur-sm bg-card/95 border-none shadow-none sm:border sm:shadow-sm">
                                <CardHeader>
                                    <CardTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
                                    <CardDescription>
                                        {isLogin
                                            ? 'Enter your credentials to access your account'
                                            : 'Sign up to start your learning journey'}
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                                    <CardContent className="space-y-4">
                                        {error && (
                                            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4" />
                                                {error}
                                            </div>
                                        )}
                                        {success && isLogin && (
                                            <div className="bg-green-500/15 text-green-500 text-sm p-3 rounded-md flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4" />
                                                {success}
                                            </div>
                                        )}

                                        {!isLogin && (
                                            <div className="space-y-2">
                                                <SimpleLabel htmlFor="name">Full Name</SimpleLabel>
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <SimpleLabel htmlFor="email">Email</SimpleLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <SimpleLabel htmlFor="password">Password</SimpleLabel>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col space-y-4">
                                        <Button type="submit" className="w-full">
                                            {isLogin ? 'Sign In' : 'Sign Up'}
                                        </Button>

                                        <div className="relative w-full">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-background px-2 text-muted-foreground">
                                                    Or
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setIsLogin(!isLogin);
                                                setError('');
                                                setSuccess('');
                                            }}
                                            className="w-full"
                                        >
                                            {isLogin ? 'Create an Account' : 'Back to Login'}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
