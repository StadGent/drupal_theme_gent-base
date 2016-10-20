<?php if ($items): ?>
<div id="field-slideshow-wrapper" class="field-slideshow-wrapper clearfix">
  <?php if ($item = reset($items)): ?>
    <?php if (isset($item['image_medium'])): ?>
      <?php $item = array_shift($items); ?>
      <div class="l-full <?php if (!$item['title']): ?>padding-bottom<?php endif;?>">
        <div class="mask ratio--big-thumb">
          <a rel="gallery-1" href="<?php print $item['image_full'];?>" class="swipebox" title="<?php echo $item['title'];?>">
           <img src="<?php print $item['image_medium'];?>" alt="<?php echo $item['alt'];?>" <?php print $item['attributes']; ?> />
          </a>
        </div>
        <?php if ($item['title']): ?>
        <p class="caption"><?php echo $item['title'];?></p>
        <?php endif; ?>
      </div>
    <?php endif; ?>
  <?php endif; ?>

  <?php if ($items): ?>
    <div class="thumbs-container">
    <?php foreach ($items as $num => $item): ?>
    <div class="l-thumb">
      <div class="mask ratio--thumb">
        <a href="<?php print $item['image_full'];?>" rel="gallery-1" class="swipebox" title="<?php echo $item['title'];?>">
          <img src="<?php print $item['image_thumbnail'];?>" alt="<?php echo $item['alt'];?>" <?php print $item['attributes']; ?> />
        </a>
      </div>
    </div>
    <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>
<?php endif; ?>
