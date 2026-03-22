<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Repo;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $blogs = Blog::all();
        $repos = Repo::all();

        $baseUrl = config('app.frontend_url', 'https://yunuscanyilmaz.com');

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Static pages
        foreach (['en', 'tr'] as $lang) {
            foreach (['', 'about', 'contact', 'blogs', 'repos'] as $page) {
                $path = $page ? "{$lang}/{$page}" : $lang;
                $xml .= '<url>';
                $xml .= "<loc>{$baseUrl}/{$path}</loc>";
                $xml .= '<changefreq>weekly</changefreq>';
                $xml .= '<priority>' . ($page === '' ? '1.0' : '0.8') . '</priority>';
                $xml .= '</url>';
            }
        }

        // Blog pages
        foreach ($blogs as $blog) {
            foreach (['en', 'tr'] as $lang) {
                $slugField = "slug_{$lang}";
                $xml .= '<url>';
                $xml .= "<loc>{$baseUrl}/{$lang}/blogs/{$blog->{$slugField}}</loc>";
                $xml .= '<lastmod>' . $blog->updated_at?->toW3cString() . '</lastmod>';
                $xml .= '<changefreq>monthly</changefreq>';
                $xml .= '<priority>0.7</priority>';
                $xml .= '</url>';
            }
        }

        // Repo pages
        foreach ($repos as $repo) {
            foreach (['en', 'tr'] as $lang) {
                $xml .= '<url>';
                $xml .= "<loc>{$baseUrl}/{$lang}/repos/{$repo->slug}</loc>";
                $xml .= '<lastmod>' . $repo->updated_at?->toW3cString() . '</lastmod>';
                $xml .= '<changefreq>monthly</changefreq>';
                $xml .= '<priority>0.6</priority>';
                $xml .= '</url>';
            }
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
