"""Forms for interacting with the dashboard."""

import logging
from django import forms
from django.contrib import auth
from django.forms.utils import ErrorList

logger = logging.getLogger('hydroweb')


class LoginForm(forms.Form):
    """Log in user."""

    username = forms.CharField(max_length=255)
    password = forms.CharField(max_length=255)

    def authenticate(self, request):
        """Attempt to authenticate user."""
        self.request = request
        self.user = auth.authenticate(
            self.request,
            username=self.cleaned_data['username'].lower(),
            password=self.cleaned_data['password'])
        if self.user:
            return True
        errors = self._errors.setdefault("username", ErrorList())
        errors.append("Username and password not recognised")
        return False

    def login(self):
        """Log in authenticated user."""
        if self.user is not None:
            auth.login(self.request, self.user)
            logger.info(f"Logged in user {self.user.username}")
