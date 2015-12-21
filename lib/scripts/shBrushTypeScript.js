/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

  function Brush() {
    var keywords = 'break case catch class continue ' +
      'default delete do else enum export extends false  ' +
      'for function if implements import in instanceof ' +
      'interface constructor let new null package private protected ' +
      'static return super switch ' +
      'this throw true try typeof var while with yield' +
      ' any boolean declare get module number public set string component'; // TypeScript-specific, everything above is common with JavaScript

    this.regexList = [
      {
        regex: SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,
        css: 'string'
      },
      {
        regex: SyntaxHighlighter.regexLib.multiLineSingleQuotedString,
        css: 'string'
      },
      {
        regex: SyntaxHighlighter.regexLib.singleLineCComments,
        css: 'comments'
      },
      {
        regex: SyntaxHighlighter.regexLib.multiLineCComments,
        css: 'comments'
      },
      {
        regex: new RegExp(this.getKeywords(keywords), 'gm'),
        css: 'keyword'
      }
      ];

    this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
  };

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['ts', 'TypeScript', 'typescript'];

	SyntaxHighlighter.brushes.typescript = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
