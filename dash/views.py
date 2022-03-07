"""Dashboard views."""

import logging

from django.contrib import auth
from django.conf import settings
from django.shortcuts import render, redirect

from .middleware.login import login_exempt
from .forms import LoginForm

logger = logging.getLogger('django')


def index(request):
    """Show dash homepage."""
    # Fetch Monitor records
    return render(request, 'dash/index.html', {
        'data': None,
        'production': getattr(settings, 'PRODUCTION', False),
    })


@login_exempt
def login(request):
    """Show dash login page."""
    form = LoginForm()

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            if form.authenticate(request):
                form.login()
                return redirect('/')

    return render(request, 'dash/login.html', {'form': form})


def logout(request):
    """Log user out."""
    if request.user.is_authenticated:
        auth.logout(request)
    return redirect('/login')
