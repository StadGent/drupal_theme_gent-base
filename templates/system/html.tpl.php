<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>
<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>

  <?php if (isset($head_scripts)): ?>
    <?php print $head_scripts; ?>
  <?php endif; ?>

  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta http-equiv="cleartype" content="on" />
  <meta name="HandheldFriendly" content="True" />
  <meta name="MobileOptimized" content="320" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,400italic" rel="stylesheet" type="text/css" />

<body<?php print $attributes;?>>

  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

  <?php print $scripts; ?>

  <?php if (isset($closure)): ?>
    <?php print $closure; ?>
  <?php endif; ?>
</body>
</html>
