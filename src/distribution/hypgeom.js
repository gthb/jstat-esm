export function pdf(k, N, m, n) {
  // Hypergeometric PDF.

  // A simplification of the CDF algorithm below.

  // k = number of successes drawn
  // N = population size
  // m = number of successes in population
  // n = number of items drawn from population

  if (k !== k | 0) {
    return false;
  } else if (k < 0 || k < m - (N - n)) {
    // It's impossible to have this few successes drawn.
    return 0;
  } else if (k > n || k > m) {
    // It's impossible to have this many successes drawn.
    return 0;
  } else if (m * 2 > N) {
    // More than half the population is successes.

    if (n * 2 > N) {
      // More than half the population is sampled.

      return pdf(N - m - n + k, N, N - m, N - n)
    } else {
      // Half or less of the population is sampled.

      return pdf(n - k, N, N - m, n);
    }

  } else if (n * 2 > N) {
    // Half or less is successes.

    return pdf(m - k, N, m, N - n);

  } else if (m < n) {
    // We want to have the number of things sampled to be less than the
    // successes available. So swap the definitions of successful and sampled.
    return pdf(k, N, n, m);
  } else {
    // If we get here, half or less of the population was sampled, half or
    // less of it was successes, and we had fewer sampled things than
    // successes. Now we can do this complicated iterative algorithm in an
    // efficient way.

    // The basic premise of the algorithm is that we partially normalize our
    // intermediate product to keep it in a numerically good region, and then
    // finish the normalization at the end.

    // This variable holds the scaled probability of the current number of
    // successes.
    var scaledPDF = 1;

    // This keeps track of how much we have normalized.
    var samplesDone = 0;

    for (var i = 0; i < k; i++) {
      // For every possible number of successes up to that observed...

      while (scaledPDF > 1 && samplesDone < n) {
        // Intermediate result is growing too big. Apply some of the
        // normalization to shrink everything.

        scaledPDF *= 1 - (m / (N - samplesDone));

        // Say we've normalized by this sample already.
        samplesDone++;
      }

      // Work out the partially-normalized hypergeometric PDF for the next
      // number of successes
      scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
    }

    for (; samplesDone < n; samplesDone++) {
      // Apply all the rest of the normalization
      scaledPDF *= 1 - (m / (N - samplesDone));
    }

    // Bound answer sanely before returning.
    return Math.min(1, Math.max(0, scaledPDF));
  }
}

export function cdf(x, N, m, n) {
  // Hypergeometric CDF.

  // This algorithm is due to Prof. Thomas S. Ferguson, <tom@math.ucla.edu>,
  // and comes from his hypergeometric test calculator at
  // <http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html>.

  // x = number of successes drawn
  // N = population size
  // m = number of successes in population
  // n = number of items drawn from population

  if (x < 0 || x < m - (N - n)) {
    // It's impossible to have this few successes drawn or fewer.
    return 0;
  } else if (x >= n || x >= m) {
    // We will always have this many successes or fewer.
    return 1;
  } else if (m * 2 > N) {
    // More than half the population is successes.

    if (n * 2 > N) {
      // More than half the population is sampled.

      return cdf(N - m - n + x, N, N - m, N - n)
    } else {
      // Half or less of the population is sampled.

      return 1 - cdf(n - x - 1, N, N - m, n);
    }

  } else if (n * 2 > N) {
    // Half or less is successes.

    return 1 - cdf(m - x - 1, N, m, N - n);

  } else if (m < n) {
    // We want to have the number of things sampled to be less than the
    // successes available. So swap the definitions of successful and sampled.
    return cdf(x, N, n, m);
  } else {
    // If we get here, half or less of the population was sampled, half or
    // less of it was successes, and we had fewer sampled things than
    // successes. Now we can do this complicated iterative algorithm in an
    // efficient way.

    // The basic premise of the algorithm is that we partially normalize our
    // intermediate sum to keep it in a numerically good region, and then
    // finish the normalization at the end.

    // Holds the intermediate, scaled total CDF.
    var scaledCDF = 1;

    // This variable holds the scaled probability of the current number of
    // successes.
    var scaledPDF = 1;

    // This keeps track of how much we have normalized.
    var samplesDone = 0;

    for (var i = 0; i < x; i++) {
      // For every possible number of successes up to that observed...

      while (scaledCDF > 1 && samplesDone < n) {
        // Intermediate result is growing too big. Apply some of the
        // normalization to shrink everything.

        var factor = 1 - (m / (N - samplesDone));

        scaledPDF *= factor;
        scaledCDF *= factor;

        // Say we've normalized by this sample already.
        samplesDone++;
      }

      // Work out the partially-normalized hypergeometric PDF for the next
      // number of successes
      scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));

      // Add to the CDF answer.
      scaledCDF += scaledPDF;
    }

    for (; samplesDone < n; samplesDone++) {
      // Apply all the rest of the normalization
      scaledCDF *= 1 - (m / (N - samplesDone));
    }

    // Bound answer sanely before returning.
    return Math.min(1, Math.max(0, scaledCDF));
  }
}
