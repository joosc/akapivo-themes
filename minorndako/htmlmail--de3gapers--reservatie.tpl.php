<?php

/**
 * @file
 * Sample template for HTML Mail test messages.
 */
?>
<table align="center" bgcolor="#B3B638" border="0" cellpadding="0" cellspacing="0" width="100%"> 
        <tbody><tr><td align="center" valign="top">
            <table height="10" bgcolor="#B3B638" border="0" cellpadding="0" cellspacing="0" width="700">
                <tbody>
					<?php echo $params['header']; ?>
					<?php echo $params['body']; ?>
					<?php echo $params['footer']; ?>
				</tbody>
			</table>
		</td></tr></tbody>
</table>
<?php if ($debug): ?>
<hr />
<div class="htmlmail-debug">
  <dl><dt><p>
    To customiiiiiize this test message:
  </p></dt><dd><ol><li><p><?php if (empty($theme)): ?>
    Visit <u>admin/config/system/htmlmail</u>
    and select a theme to hold your custom email template files.
  </p></dt><dd><ol><li><p><?php elseif (empty($theme_path)): ?>
    Visit <u>admin/appearance</u>
    to enable your selected <u><?php echo ucfirst($theme); ?></u> theme.
  </p></dt><dd><ol><li><p><?php endif; ?>
    Copy the
    <a href="http://drupalcode.org/project/htmlmail.git/blob_plain/refs/heads/7.x-2.x:/htmlmail--htmlmail.tpl.php"><code>htmlmail--htmlmail.tpl.php</code></a>
    file to your <u><?php echo ucfirst($theme); ?></u> theme directory
    <u><code><?php echo $theme_path; ?></code></u>.
  </p></li><li><p>
    Edit the copied file.
  </p></li></ol></dd></dl>
</div>
<?php endif;
