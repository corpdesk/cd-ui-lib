import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsHelperService {

  constructor() { }

  // Searches for the given pattern string in the given text string using the Knuth-Morris-Pratt string matching algorithm.
  // If the pattern is found, this returns the index of the start of the earliest match in 'text'. Otherwise -1 is returned.
  kmpSearch(pattern: any, text: any) {
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();
    if (pattern.length == 0)
      return 0; // Immediate match

    // Compute longest suffix-prefix table
    var lsp = [0]; // Base case
    for (var i = 1; i < pattern.length; i++) {
      var j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
      while (j > 0 && pattern.charAt(i) != pattern.charAt(j))
        j = lsp[j - 1];
      if (pattern.charAt(i) == pattern.charAt(j))
        j++;
      lsp.push(j);
    }

    // Walk through text string
    var j = 0; // Number of chars matched in pattern
    for (var i = 0; i < text.length; i++) {
      while (j > 0 && text.charAt(i) != pattern.charAt(j))
        j = lsp[j - 1]; // Fall back in the pattern
      if (text.charAt(i) == pattern.charAt(j)) {
        j++; // Next char matched, increment position
        if (j == pattern.length)
          return i - (j - 1);
      }
    }
    return -1; // Not found
  }

  sort(arr: any, sortField: any) {
    let pubsTemp = arr;
    return pubsTemp.sort(function (a: any, b: any) {
      return b[sortField] - a[sortField];
    });
  }
}
