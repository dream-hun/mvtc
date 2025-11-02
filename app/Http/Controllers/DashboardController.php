<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with statistics and recent students
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'statistics' => DashboardService::getStatistics(),
            'recentStudents' => DashboardService::getRecentStudents(),
        ]);
    }
}