<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
<header class="l-full">
	<h2 class="h1 hT"><?php print $title; ?></h2>
</header>
<?php endif; ?>

<?php if ($rows): ?>
  <div class="view-content clearfix">
  <?php foreach ($rows as $id => $row): ?>
    <div<?php if (isset($classes_array[$id]) && $classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
      <?php print $row; ?>
    </div>
  <?php endforeach; ?>
  </div>
<?php endif; ?>
