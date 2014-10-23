jmscroll
========

j(m)scroll : Infinite Scrolling Plugin for jQuery / jQuery Mobile

A variation of Philip Klauzinski's excellent jscroll Plugin (<a href="http://jscroll.com">http://jscroll.com</a>). The only problem i had with it was that when jQuery Mobile was included jscroll was loading more than one page at initialization. Given that, and my need for a not fixed footer for social buttons, copyrights et al. i created a simpler version that loads next set of content when the user scrolls to the starting of the footer (or some predefined pxs above it). I would really like to know what breaks jscroll when jQuery Mobile is included. If you know the answer please share it with me. Unfortunately i don't have the time to find it myself.  

You can find a simple working example in the example/ folder. The parameters you can define are:

<b>autoTrigger</b>: true or false for loading automatically or by clicking a button<br />
<b>maxPages</b>: if you want to get to the footer you need to define a maximum page number<br />
<b>loadingHtml</b>: html to show while loading the next content<br />
<b>loadingSpeed</b>: you can delay the loading (most likely for testing purposes)<br />
<b>contentSelector</b>: selector for loading only part of the response<br />
<b>nextSelector</b>: selector to find the link which contains the href pointing to the next set of content<br />
<b>footerSelector</b>: footer selector<br />
<b>footerPadding</b>: the distance from the footer at which to trigger the loading of the next set of content<br />
<b>callback</b>: callback to be called at the end of each page load<br />
