<div class="gent-library-block library-my-library-block island island--zeta">
  <div class="island__body clearfix">
    <h2><?php print t('My library') ?></h2>
    <p><?php print t('Use your "My library" profile to use the online services.') ?></p>

    <a class="btn btn--medium btn--alpha" href="<?php print $register_url ?>" target="_blank"><?php print t('Register on My library') ?></a>
    <a class="btn btn--medium btn--beta"  href="<?php print $login_url?>" target="_blank"><?php print t('Log in to My library') ?></a>
    <?php if ($more_url) : ?><a href="<?php print $more_url ?>" target="_blank"><?php print t('More info') ?></a><?php endif; ?>
  </div>
</div>