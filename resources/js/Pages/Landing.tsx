import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

import { ArrowRight, BookOpen, GraduationCap, Users, Calendar } from 'lucide-react';

export default function Landing() {
    return (
        <>
            <Head title="Welcome to MVTC - Vocational Training Center" />

            {/* Hero Section */}
            <div className="relative bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                        <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                                <div className="hidden sm:mb-10 sm:flex">
                                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                        March 2025 Intake is now open.{' '}
                                        <a href="#apply" className="whitespace-nowrap font-semibold text-indigo-600">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Apply now <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Build Your Future with Professional Skills
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Join our vocational training center and gain practical skills that employers need.
                                    Our industry-focused programs prepare you for real-world success.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link href={route('students.create')}>
                                        <Button size="lg">
                                            Start Your Journey
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <a href="#programs" className="text-sm font-semibold leading-6 text-gray-900">
                                        View Programs <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
                        src="/images/Welding-students-going-to-do-some-metal-works.webp"
                        alt="Students learning vocational skills"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Choose Us</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to start your career
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Our vocational training programs are designed to give you the skills and knowledge needed
                            to succeed in today's competitive job market.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <GraduationCap className="h-5 w-5 flex-none text-indigo-600" />
                                    Expert Instructors
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">
                                        Learn from industry professionals with years of practical experience in their fields.
                                    </p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <BookOpen className="h-5 w-5 flex-none text-indigo-600" />
                                    Practical Training
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">
                                        Hands-on experience with modern equipment and real-world projects.
                                    </p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <Users className="h-5 w-5 flex-none text-indigo-600" />
                                    Career Support
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">
                                        Job placement assistance and career counseling to help you succeed.
                                    </p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-500" id="apply">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Ready to start your journey?
                        <br />
                        Apply for admission today.
                    </h2>
                    <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                    <Link href={route('students.create')}>
                        <Button size="lg">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        </Link>
                        <a href="#contact" className="text-sm font-semibold leading-6 text-gray-900">
                            Contact Us <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Programs Preview Section */}
            <div className="bg-white py-24 sm:py-32" id="programs">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Programs</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Choose from our wide range of vocational training programs
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {programs.map((program) => (
                            <article key={program.id} className="flex flex-col items-start">
                                <div className="relative w-full">
                                    <img
                                        src={program.imageUrl}
                                        alt={program.title}
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={program.intake} className="text-gray-500">
                                            {program.duration}
                                        </time>
                                        <span aria-hidden="true">·</span>
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <time dateTime={program.intake} className="text-gray-500">
                                            Next Intake: {new Date(program.intake).toLocaleDateString()}
                                        </time>
                                    </div>




                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={program.href}>
                                                <span className="absolute inset-0" />
                                                {program.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{program.description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

const programs = [
    {
        id: 1,
        title: 'Auto Engine Repair & Automotive Technology',
        href: '#',
        description:
            'Learn to diagnose, maintain, and repair modern vehicles with our comprehensive automotive technology program.',
        imageUrl: '/images/auto-engine.webp',
        intake: '2025-03-03',
        duration: '6 Months',

    },
    {
        id: 2,
        title: 'Welding and Metal Works',
        href: '#',
        description:
            'Master the art of welding and metal fabrication with our hands-on training program.',
        imageUrl: '/images/Welding-students-going-to-do-some-metal-works.webp',
        intake: '2025-03-03',
        duration: '6 Months',
    },
    {
        id: 3,
        title: 'Tailoring and Fashion Design',
        href: '#',
        description:
            'Learn the skills needed to create beautiful garments and launch your career in fashion design.',
        imageUrl: '/images/tailoring.webp',
        intake: '2025-03-03',
        duration: '6 Months',
    },
    {
        id: 4,
        title: 'Masonry and Construction',
        href: '#',
        description:
            'Develop essential skills in bricklaying, concrete work, and construction techniques for a career in building.',
        imageUrl: '/images/masonry.webp',
        intake: '2025-03-03',
        duration: '6 Months',
    },{
        id: 5,
        title: 'Hair Dressing and Beauty Aesthetics',
        href: '#',
        description:
            'Learn the latest hair styling and beauty techniques to start your career in the beauty industry.',
        imageUrl: '/images/beauty-aesthetics.webp',
        intake: '2025-03-03',
        duration: '6 Months',
    }
];
