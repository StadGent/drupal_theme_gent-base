<?php
/**
 * @file
 * Default view template to display content in a Masonry layout.
 */
?>
<div class="main-masonry">
<?php foreach ($rows as $id => $row): ?>
  <article class="media medium-6 large-4 col masonry-item<?php if ($classes_array[$id]) print ' ' . $classes_array[$id]; ?>">
    <!-- start row -->
    <?php print $row; ?>
    <!-- stop row -->
  </article>
<?php endforeach; ?>
</div>
