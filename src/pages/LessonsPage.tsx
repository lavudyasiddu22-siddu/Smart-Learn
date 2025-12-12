import { useState } from 'react';
import { Play, CheckCircle, Clock, BookOpen, Award, Download, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';

const courses = [
    {
        id: 1,
        title: "Full Stack Web Development",
        instructor: "Sarah Johnson",
        duration: "12h 30m",
        lessons: 24,
        progress: 45,
        image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Web Dev"
    },
    {
        id: 2,
        title: "Machine Learning Fundamentals",
        instructor: "Dr. Alan Chen",
        duration: "18h 15m",
        lessons: 32,
        progress: 10,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "AI/ML"
    },
    {
        id: 3,
        title: "Cloud Computing with AWS",
        instructor: "Mike Ross",
        duration: "10h 45m",
        lessons: 18,
        progress: 0,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Cloud"
    },
    {
        id: 4,
        title: "Cybersecurity Essentials",
        instructor: "Alex Mercer",
        duration: "14h 20m",
        lessons: 22,
        progress: 0,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Cybersecurity"
    },
    {
        id: 5,
        title: "Blockchain & Cryptocurrency",
        instructor: "Satoshi N.",
        duration: "16h 00m",
        lessons: 20,
        progress: 0,
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Blockchain"
    },
    {
        id: 6,
        title: "Data Science with Python",
        instructor: "Emily White",
        duration: "20h 30m",
        lessons: 35,
        progress: 5,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Data Science"
    },
    {
        id: 7,
        title: "DevOps Engineering",
        instructor: "John Doe",
        duration: "15h 45m",
        lessons: 25,
        progress: 0,
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "DevOps"
    },
    {
        id: 8,
        title: "Mobile App Development (Flutter)",
        instructor: "Jane Smith",
        duration: "22h 10m",
        lessons: 40,
        progress: 0,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Mobile Dev"
    },
    {
        id: 9,
        title: "Internet of Things (IoT)",
        instructor: "Robert Brown",
        duration: "11h 50m",
        lessons: 19,
        progress: 0,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "IoT"
    },
    {
        id: 10,
        title: "Game Development with Unity",
        instructor: "Chris Evans",
        duration: "25h 00m",
        lessons: 45,
        progress: 0,
        image: "https://images.unsplash.com/photo-1556438050-9488f0df3578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Game Dev"
    },
    {
        id: 11,
        title: "Augmented & Virtual Reality",
        instructor: "Mark Z.",
        duration: "13h 25m",
        lessons: 21,
        progress: 0,
        image: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "AR/VR"
    },
    {
        id: 12,
        title: "Big Data Analytics",
        instructor: "Lisa Ray",
        duration: "19h 40m",
        lessons: 30,
        progress: 0,
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Big Data"
    },
    {
        id: 13,
        title: "Ethical Hacking",
        instructor: "Mr. Robot",
        duration: "17h 15m",
        lessons: 28,
        progress: 0,
        image: "https://images.unsplash.com/photo-1563206767-5b1d97289374?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Cybersecurity"
    },
    {
        id: 14,
        title: "UI/UX Design Principles",
        instructor: "Sarah Lee",
        duration: "10h 00m",
        lessons: 16,
        progress: 0,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Design"
    },
    {
        id: 15,
        title: "Computer Networks",
        instructor: "David Kim",
        duration: "14h 50m",
        lessons: 23,
        progress: 0,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Networking"
    },
    {
        id: 16,
        title: "Operating Systems",
        instructor: "Linus T.",
        duration: "16h 30m",
        lessons: 26,
        progress: 0,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "OS"
    }
];

export function LessonsPage() {
    const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const { user } = useAuth();

    const handleStartQuiz = () => {
        setShowQuiz(true);
    };

    const handleQuizSubmit = () => {
        // Mock quiz logic - assume pass
        setTimeout(() => {
            setShowQuiz(false);
            setShowCertificate(true);
        }, 1000);
    };

    const handleDownloadCertificate = () => {
        // Mock download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `Certificate-${selectedCourse?.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
                    <p className="text-muted-foreground mt-2">Master new skills with our curated courses</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" className="gap-2" onClick={() => setSelectedCourse(course)}>
                                    <Play className="h-4 w-4" /> Start Learning
                                </Button>
                            </div>
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                    {course.category}
                                </span>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {course.duration}
                                </div>
                            </div>
                            <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                            <CardDescription>{course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                            <div className="flex justify-between w-full text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    {course.lessons} Lessons
                                </div>
                                {course.progress === 100 && (
                                    <div className="flex items-center text-green-500">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Completed
                                    </div>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Course Detail Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-background w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">{selectedCourse.title}</h2>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedCourse(null)}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center relative group">
                                <div className="text-white text-center">
                                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                    <p>Video Player Placeholder</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-lg">Course Content</h3>
                                    <p className="text-sm text-muted-foreground">12 Lessons • 2h 30m total</p>
                                </div>
                                <Button onClick={handleStartQuiz}>Take Final Test</Button>
                            </div>

                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center p-3 rounded-lg hover:bg-accent cursor-pointer border">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">
                                            {i}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Lesson {i}: Introduction to {selectedCourse.category}</h4>
                                            <p className="text-xs text-muted-foreground">15 mins</p>
                                        </div>
                                        <Play className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quiz Modal */}
            {showQuiz && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-lg">
                        <CardHeader>
                            <CardTitle>Final Assessment</CardTitle>
                            <CardDescription>Answer correctly to earn your certificate.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="font-medium">1. What is the primary purpose of {selectedCourse?.category}?</p>
                                <div className="grid gap-2">
                                    <Button variant="outline" className="justify-start" onClick={handleQuizSubmit}>A. To solve complex problems</Button>
                                    <Button variant="outline" className="justify-start" onClick={handleQuizSubmit}>B. To build user interfaces</Button>
                                    <Button variant="outline" className="justify-start" onClick={handleQuizSubmit}>C. To manage databases</Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" onClick={() => setShowQuiz(false)}>Cancel</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-2xl bg-white text-black">
                        <CardContent className="p-12 text-center space-y-6 border-8 border-double border-yellow-500 m-2">
                            <div className="flex justify-center">
                                <Award className="h-16 w-16 text-yellow-500" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-serif font-bold text-gray-900">Certificate of Completion</h2>
                                <p className="text-gray-500 mt-2">This certifies that</p>
                            </div>
                            <div className="text-3xl font-bold text-primary border-b-2 border-gray-300 pb-2 inline-block px-12">
                                {user?.name || "Student Name"}
                            </div>
                            <div>
                                <p className="text-gray-500">has successfully completed the course</p>
                                <h3 className="text-2xl font-bold mt-1">{selectedCourse?.title}</h3>
                            </div>
                            <div className="flex justify-between items-end pt-8 text-sm text-gray-500">
                                <div className="text-left">
                                    <p className="border-t border-gray-400 pt-1 w-32">Date</p>
                                    <p>{new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="border-t border-gray-400 pt-1 w-32">Instructor</p>
                                    <p>{selectedCourse?.instructor}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 flex justify-end gap-2 p-4">
                            <Button variant="outline" onClick={() => setShowCertificate(false)}>Close</Button>
                            <Button onClick={handleDownloadCertificate}>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
