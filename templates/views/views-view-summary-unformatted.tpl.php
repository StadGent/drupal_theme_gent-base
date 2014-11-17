<div class="views-summary island island--zeta">
  <div class="island__body">
  <?php foreach ($rows as $id => $row): ?>
    <?php print (!empty($options['inline']) ? '<span' : '<div') . '>'; ?>
      <?php if (!empty($row->separator)) { print $row->separator; } ?>
      <a href="<?php print $row->url; ?>"<?php print !empty($row_classes[$id]) ? ' class="' . $row_classes[$id] . '"' : ''; ?>><?php print $row->link; ?></a>
      <?php if (!empty($options['count'])): ?>
        (<?php print $row->count; ?>)
      <?php endif; ?>
    <?php print !empty($options['inline']) ? '</span>' : '</div>'; ?>
  <?php endforeach; ?>
  </div>
</div>