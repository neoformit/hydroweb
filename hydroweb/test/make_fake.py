"""Generate fake data to develop with."""

import math
import pandas as pd
import datetime as dt
from matplotlib import pyplot as plt

TIME_START = dt.datetime.strptime("2021-09-20 04:00", "%Y-%m-%d %H:%M")
SAMPLE_INTERVAL = dt.timedelta(minutes=5)


def make_data_series(n=1000, lower=0, upper=100, period=dt.timedelta(hours=6)):
    """Create fake time series data with given params."""
    INCREMENT = SAMPLE_INTERVAL / (period / 2)
    RANGE = upper - lower

    series = []

    for i in range(n):
        m = i * INCREMENT
        stat = math.sin(m * math.pi) / 2 * RANGE + lower + RANGE / 2
        series.append(round(stat, 2))

    return series


if __name__ == '__main__':
    n = 1000

    df = pd.DataFrame(
        index=[
            TIME_START + SAMPLE_INTERVAL * i
            for i in range(n)
        ],
        data={
            'ph': make_data_series(
                n=n,
                lower=5.5,
                upper=6.5,
                period=dt.timedelta(days=3),
            ),
            'ec': make_data_series(
                n=n,
                lower=1.6,
                upper=2.0,
                period=dt.timedelta(days=2),
            ),
            'depth_mm': make_data_series(
                n=n,
                lower=500,
                upper=600,
                period=dt.timedelta(days=2.5),
            ),
            'temp_c': make_data_series(
                n=n,
                lower=19,
                upper=22,
                period=dt.timedelta(days=1),
            ),
            'pressure_psi': make_data_series(
                n=n,
                lower=100,
                upper=130,
                period=dt.timedelta(hours=3),
            ),
        },
    )
    fig, subs = plt.subplots(
        nrows=2,
        ncols=3,
        sharex=True,
        squeeze=True,
        figsize=(10, 6),
    )
    for col, s in zip(df.columns, subs.flatten()[:-1]):
        d = df[col]
        s.plot(d)
        s.title.set_text(col)
        s.set_ylim(0, max(d) * 1.8)
        s.tick_params(labelrotation=90)
    plt.xticks(rotation=90)
    plt.savefig('sample_plot.png', dpi=300, facecolor='w')
    df.to_csv('data/readings.csv')
