<?php if ($display): ?>
<div id="field-slideshow-wrapper" class="field-slideshow-wrapper">

  <?php if ($item_count > 0): ?>
    <?php $item = array_shift($items); ?>
    <div class="l-full">
      <div class="mask ratio--big-thumb">
        <a rel="gallery-1" href="<?php print $item['image_full'];?>" class="swipebox" title="<?php echo $item['title'];?>">
         <img src="<?php print $item['image_medium'];?>" alt="<?php echo $item['alt'];?>"/>
        </a>
      </div>
      <p class="caption"><?php echo $item['title'];?></p>
    </div>
  <?php endif; ?>

  <?php if ($item_count > 1): ?>
    <div class="l-thumb">
    <?php foreach ($items as $num => $item): ?>
      <div class="mask ratio--thumb">
        <a href="<?php print $item['image_full'];?>" rel="gallery-1" class="swipebox" title="<?php echo $item['title'];?>">
          <img src="<?php print $item['image_thumbnail'];?>" alt="<?php echo $item['alt'];?>"  />
        </a>
      </div>
    <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>
<?php endif; ?>
