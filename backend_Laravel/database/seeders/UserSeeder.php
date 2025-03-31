<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;  // استيراد الـ Model هنا
use Illuminate\Support\Facades\Hash;  // إذا كنت تستخدم Hash::make

class UserSeeder extends Seeder
{
    public function run()
    {
        // إضافة مستخدم ثابت
        User::create([
            'name' => 'Test User',  // اسم المستخدم
            'email' => 'testuser@example.com',  // البريد الإلكتروني
            'password' => Hash::make('password123')  // كلمة المرور مشفرة
        ]);

        // إنشاء 10 مستخدمين عشوائيين باستخدام Factory
        User::factory(10)->create();
    }
}
