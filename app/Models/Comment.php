<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Comment
 * 
 * @property int $id
 * @property int $post_id
 * @property int $author_id
 * @property string $content
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property User $user
 * @property Post $post
 *
 * @package App\Models
 */
class Comment extends Model
{
	use SoftDeletes;
	protected $table = 'comments';

	protected $casts = [
		'post_id' => 'int',
		'author_id' => 'int'
	];

	protected $fillable = [
		'post_id',
		'author_id',
		'content'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'author_id');
	}

	public function post()
	{
		return $this->belongsTo(Post::class);
	}
}
