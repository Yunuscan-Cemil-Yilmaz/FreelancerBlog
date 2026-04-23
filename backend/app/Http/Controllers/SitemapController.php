<?php

namespace App\Http\Controllers;

use App\Business\Extentions\GenerateSitemap\GenerateSitemap;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(GenerateSitemap $extension): Response
    {
        $xml = $extension->handle();

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
