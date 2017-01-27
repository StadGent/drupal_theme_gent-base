<?php

/**
 * @file
 * Display the progress bar for multipage forms.
 *
 * Available variables:
 * - $node: The webform node.
 * - $progressbar_page_number: TRUE if the actual page number should be
 *   displayed.
 * - $progressbar_percent: TRUE if the percentage complete should be displayed.
 * - $progressbar_bar: TRUE if the bar should be displayed.
 * - $progressbar_pagebreak_labels: TRUE if the page break labels shoud be
 *   displayed.
 * - $page_num: The current page number.
 * - $page_count: The total number of pages in this form.
 * - $page_labels: The labels for the pages. This typically includes a label for
 *   the starting page (index 0), each page in the form based on page break
 *   labels, and then the confirmation page (index number of pages + 1).
 * - $percent: The percentage complete.
 */
?>
<div class="form-item webform-component webform-component-progressbar">
  <?php if ($progressbar_bar): ?>
    <div class="webform-component-progressbar-wrapper">
      <div class="webform-component-progressbar-fill"
           style="width: <?php print number_format($page_num / $page_count, 4) * 100; ?>%">&nbsp;</div>
      <?php for ($n = 1; $n < $page_count; $n++): ?>
        <div class="webform-component-progressbar-divider"
             style="left: <?php print number_format($n / $page_count, 4) * 100; ?>%"></div>
      <?php endfor; ?>
    </div>

    <?php if ($progressbar_pagebreak_labels): ?>
      <div class="webform-component-progressbar-pages clearfix">
      <?php for ($n = 1; $n <= $page_count; $n++): ?>
        <div class="webform-component-progressbar-page<?php if ($n < $page_num) {print ' completed';}; ?><?php if ($n == $page_num) {print ' current';}; ?>" style="width: <?php print number_format(100 / $page_count, 2); ?>%">
          <span class="webform-component-progressbar-page-number"><?php print $n; ?></span>
          <span class="webform-component-progressbar-page-label">
            <?php print '. ' . check_plain($page_labels[$n - 1]); ?>
          </span>
        </div>
      <?php endfor; ?>
    <?php endif; ?>
    </div>
  <?php endif; ?>

  <?php if ($progressbar_page_number): ?>
    <div class="webform-component-progressbar-number">
      <?php print t('Page @start of @end', array('@start' => $page_num, '@end' => $page_count)); ?>
      <?php if ($progressbar_percent): ?>
        <span class="webform-component-progressbar-number">
          (<?php print number_format($percent, 0); ?>%)
        </span>
      <?php endif; ?>
    </div>
  <?php endif; ?>

  <?php if (!$progressbar_page_number && $progressbar_percent): ?>
    <div class="webform-component-progressbar-number">
      <?php print number_format($percent, 0); ?>%
    </div>
  <?php endif; ?>
</div>
