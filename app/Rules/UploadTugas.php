<?php

namespace App\Rules;

use App\Models\Tugas;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Carbon;

class UploadTugas implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $tugas = Tugas::find($value);

        if (!$tugas) {
            $fail("Tugas tidak ditemukan.");
            return;
        }

        if (!$tugas->available) {
            $fail("Sesi pengumpulan tugas sudah ditutup");
            return;
        }

        if ($tugas->limit_date && Carbon::now()->greaterThan(Carbon::parse($tugas->limit_date))) {
            $fail("Batas waktu upload tugas sudah lewat.");
            return;
        }
    }
}
