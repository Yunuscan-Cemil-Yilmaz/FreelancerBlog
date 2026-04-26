<?php

namespace App\Business\Features\Domain\Queries\GetDomainDetailsQuery;

use App\Models\Domain;
use App\Models\Blog;
use App\Models\Repo;
use App\Models\Moderator;
use App\Models\Category;
use App\Models\User;
use App\Models\Tech;
use App\Models\Education;
use App\Models\Experiance;
use App\Models\Reference;
use App\Models\ProfessionalSkill;
use App\Models\SubCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetDomainDetailsQuery
{
    public function handle(GetDomainDetailsQueryRequest $request): GetDomainDetailsResponse
    {
        $domain = Domain::find($request->id);
        
        if (!$domain) {
            throw new ModelNotFoundException("Domain not found with ID: " . $request->id);
        }
        
        $domainValue = $domain->domain;
        $adminDomainValue = $domain->admin_domain;

        $moderators = Moderator::withoutGlobalScopes()->where(function($q) use ($domainValue, $adminDomainValue) {
            $q->where('domain', $domainValue)->orWhere('admin_domain', $adminDomainValue);
        })->get();

        $models = [
            'blogs' => Blog::class,
            'repos' => Repo::class,
            'categories' => Category::class,
            'users' => User::class,
            'techs' => Tech::class,
            'educations' => Education::class,
            'experiences' => Experiance::class,
            'references' => Reference::class,
            'professional_skills' => ProfessionalSkill::class,
            'sub_categories' => SubCategory::class,
        ];

        $counts = [];
        foreach ($models as $key => $modelClass) {
            $counts[$key] = $modelClass::withoutGlobalScopes()->where(function($q) use ($domainValue, $adminDomainValue) {
                $q->where('domain', $domainValue)->orWhere('admin_domain', $adminDomainValue);
            })->count();
        }

        return new GetDomainDetailsResponse(
            'Domain details retrieved successfully', 
            $domain, 
            $counts, 
            $moderators
        );
    }
}
