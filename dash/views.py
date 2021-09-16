"""Dashboard views."""

from django.shortcuts import render, redirect

from .forms import LoginForm


def index(request):
    """Show dash homepage."""
    # Fetch Monitor records

    return render(request, 'dash/index.html', {'data': None})


def login(request):
    """Show dash login page."""
    form = LoginForm()

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')

    return render(request, 'dash/login.html', {'form': form})
