<?php

namespace App\Business\Extentions\CurrentDomain;

class CurrentDomain
{
    private ?string $domain = null;

    public function set(?string $domain): void
    {
        $this->domain = $domain;
    }

    public function get(): ?string
    {
        return $this->domain;
    }

    public function has(): bool
    {
        return !empty($this->domain);
    }
}
