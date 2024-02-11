<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class PostsTag
 * 
 * @property int $id
 * @property int $post_id
 * @property int $tag_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Post $post
 * @property Tag $tag
 *
 * @package App\Models
 */
class PostsTag extends Model
{
	use SoftDeletes;
	protected $table = 'posts_tags';

	protected $casts = [
		'post_id' => 'int',
		'tag_id' => 'int'
	];

	protected $fillable = [
		'post_id',
		'tag_id'
	];

	public function post()
	{
		return $this->belongsTo(Post::class);
	}

	public function tag()
	{
		return $this->belongsTo(Tag::class);
	}
}
