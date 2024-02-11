<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Post
 * 
 * @property int $id
 * @property int $category_id
 * @property int $author_id
 * @property string $title
 * @property string $content
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property User $user
 * @property Category $category
 * @property Collection|Comment[] $comments
 * @property Collection|Tag[] $tags
 *
 * @package App\Models
 */
class Post extends Model
{
	use SoftDeletes;
	protected $table = 'posts';

	protected $casts = [
		'category_id' => 'int',
		'author_id' => 'int'
	];

	protected $fillable = [
		'category_id',
		'author_id',
		'title',
		'content'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'author_id');
	}

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function comments()
	{
		return $this->hasMany(Comment::class);
	}

	public function tags()
	{
		return $this->belongsToMany(Tag::class, 'posts_tags')
					->withPivot('id', 'deleted_at')
					->withTimestamps();
	}
}
