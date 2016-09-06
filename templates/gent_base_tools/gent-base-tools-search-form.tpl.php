<?php
/**
 * @file
 * Template for search widget from gent base tools .
 */
?>
<?php if (isset($form['input'])): ?>
  <input type="search"
         value="<?php print $form['input']['#value']; ?>"
         name="<?php print $form['input']['#name']; ?>"
         id="<?php print $form['input']['#id']; ?>"
         placeholder="<?php print t('What are you looking for?'); ?>"
         class="search-widget__input form-text">
<?php endif; ?>
<?php if (isset($form['submit'])): ?>
  <button type="submit" id="<?php print $form['submit']['#id']; ?>"
          class="search-widget__submit search-widget__button">
    <span class="icon icon-search"></span>
  </button>
  <button class="search-widget__open_handle search-widget__button"
          onclick="return false;">
    <span class="icon icon-search"></span>
  </button>
  <button class="search-widget__close_handle search-widget__button"
          onclick="return false;">
    <?php print t('Close'); ?>
  </button>
<?php endif; ?>
