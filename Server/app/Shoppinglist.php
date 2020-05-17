<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shoppinglist extends Model
{
    protected $fillable = ['title', 'bought_until', 'price', 'creator_id', 'helper_id'];

    public function listentries(): HasMany {
        return $this->hasMany(Listentry::class);
    }

    public function feedbacks(): HasMany {
        return $this->hasMany(Feedback::class);
    }

    public function creator() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function helper() : BelongsTo {
        return $this->belongsTo(User::class);
    }

}
