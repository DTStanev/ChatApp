using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModels.Common
{
    public class ViewModelConstants
    {
        public const string UsernameValidationRegex = "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";

        public const string EmailValidationRegex = @"^(?("")("".+?(?<!\\)""@)|(([0 - 9a - z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$";

    }
}
