<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'price' => $this->price,
            'created_at' => $this->created_at,
            'description' => $this->description,
            'isPremium' => $this->isPremium,
            'user' => $this->user->load('socmed'),
            'counts' => [
                'materials' => $this->materials->count(),
                'members' => $this->members->count(),
                'tugases' => $this->tugases->count(),
                'videos' => $this->materials->whereNotNull("video_url")->count(),
            ]
        ];
    }
}
