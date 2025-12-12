import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, BookOpen, Award, Users, CheckCircle, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export function LandingPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="container px-4 mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                            Master Coding with SmartLearn
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            The ultimate platform for BTech students to practice coding, master new skills, and earn certifications.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/auth">
                                <Button size="lg" className="text-lg px-8">Get Started</Button>
                            </Link>
                            <Link to="/lessons">
                                <Button size="lg" variant="outline" className="text-lg px-8">Explore Courses</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            </section>

            {/* Features Section */}
            <section className="py-20 bg-secondary/30">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose SmartLearn?</h2>
                        <p className="text-muted-foreground">Everything you need to excel in your tech career.</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="h-full hover:shadow-lg transition-shadow border-primary/20">
                                <CardHeader>
                                    <Code className="h-12 w-12 text-primary mb-4" />
                                    <CardTitle>Interactive Coding</CardTitle>
                                    <CardDescription>Practice with 15+ LeetCode-style problems in our advanced editor.</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="h-full hover:shadow-lg transition-shadow border-primary/20">
                                <CardHeader>
                                    <BookOpen className="h-12 w-12 text-primary mb-4" />
                                    <CardTitle>Expert Lessons</CardTitle>
                                    <CardDescription>Access 14+ courses covering Web Dev, AI/ML, Cloud, and more.</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="h-full hover:shadow-lg transition-shadow border-primary/20">
                                <CardHeader>
                                    <Award className="h-12 w-12 text-primary mb-4" />
                                    <CardTitle>Get Certified</CardTitle>
                                    <CardDescription>Earn recognized certificates upon course completion to boost your resume.</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <Users className="h-8 w-8 mx-auto text-primary" />
                            <h3 className="text-3xl font-bold">10k+</h3>
                            <p className="text-muted-foreground">Students</p>
                        </div>
                        <div className="space-y-2">
                            <Code className="h-8 w-8 mx-auto text-primary" />
                            <h3 className="text-3xl font-bold">50k+</h3>
                            <p className="text-muted-foreground">Problems Solved</p>
                        </div>
                        <div className="space-y-2">
                            <BookOpen className="h-8 w-8 mx-auto text-primary" />
                            <h3 className="text-3xl font-bold">100+</h3>
                            <p className="text-muted-foreground">Courses</p>
                        </div>
                        <div className="space-y-2">
                            <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                            <h3 className="text-3xl font-bold">5k+</h3>
                            <p className="text-muted-foreground">Certificates</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary/10">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of students learning and growing with SmartLearn today.
                    </p>
                    <Link to="/auth">
                        <Button size="lg" className="gap-2">
                            <Zap className="h-4 w-4" />
                            Join Now for Free
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
