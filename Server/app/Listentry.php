<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Listentry extends Model

{
    protected $fillable = ['description', 'amount', 'max_price'];

    public function shoppinglist() : BelongsTo {
        return $this->belongsTo(Shoppinglist::class);
    }
}
