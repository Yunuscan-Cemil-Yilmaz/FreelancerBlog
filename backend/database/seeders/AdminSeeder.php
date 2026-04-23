<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $username = env('ADMIN_USERNAME');
        $password = env('ADMIN_PASSWORD');
        $fullName = env('ADMIN_FULL_NAME');

        if (!$username || !$password) {
            $this->command->warn('ADMIN_USERNAME veya ADMIN_PASSWORD .env dosyasında bulunamadı. Seeder atlanıyor.');
            return;
        }

        // Username ile kontrol et, yoksa oluştur
        $admin = Admin::firstOrCreate(
            ['username' => $username],
            [
                'password' => $password, // Admin modelindeki 'hashed' cast sayesinde otomatik hashlenecek
                'full_name' => $fullName ?? 'System Admin',
            ]
        );

        if ($admin->wasRecentlyCreated) {
            $this->command->info("Admin kullanıcısı ({$username}) başarıyla oluşturuldu.");
        } else {
            $this->command->comment("Admin kullanıcısı ({$username}) zaten mevcut, işlem atlandı.");
        }
    }
}
